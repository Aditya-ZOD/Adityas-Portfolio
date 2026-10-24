import test from 'node:test';
import assert from 'node:assert/strict';

// Pure validation logic mirrored from ContactSection.tsx
function validateContactForm(formData) {
  const newErrors = {};
  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedSubject = formData.subject.trim();
  const trimmedMessage = formData.message.trim();

  if (!trimmedName) {
    newErrors.name = 'Please provide your name.';
  } else if (trimmedName.length < 2) {
    newErrors.name = 'Please provide your name (at least 2 characters).';
  }

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!trimmedEmail) {
    newErrors.email = 'Please provide your email address.';
  } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.includes('..')) {
    newErrors.email = 'Please provide a valid email address (e.g. name@company.com).';
  } else {
    const parts = trimmedEmail.split('@');
    if (parts.length !== 2 || !parts[1].includes('.') || parts[1].startsWith('.') || parts[1].endsWith('.')) {
      newErrors.email = 'Please provide a valid email domain (e.g. name@company.com).';
    }
  }


  if (!trimmedSubject) {
    newErrors.subject = 'Please provide a subject.';
  } else if (trimmedSubject.length < 3) {
    newErrors.subject = 'Subject should be at least 3 characters.';
  }

  if (!trimmedMessage) {
    newErrors.message = 'Please provide a message.';
  } else if (trimmedMessage.length < 10) {
    newErrors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
    trimmedPayload: {
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      subject: trimmedSubject,
      message: trimmedMessage
    }
  };
}

// Submission handler simulator testing state transitions, preservation, and API dispatching
async function simulateContactSubmit({ formData, mockFetch }) {
  let loading = false;
  let submitStatus = 'idle';
  let serverMessage = '';
  let mailtoFallback = null;
  let formState = { ...formData };
  let fetchCalled = false;

  const validation = validateContactForm(formState);
  if (!validation.isValid) {
    return {
      fetchCalled: false,
      loading: false,
      submitStatus: 'idle',
      errors: validation.errors,
      formState
    };
  }

  loading = true;
  fetchCalled = true;

  try {
    const response = await mockFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(validation.trimmedPayload)
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (response.ok && data && data.success && data.delivery_status === 'sent') {
      submitStatus = 'success';
      serverMessage = data.message || 'Your message has been sent directly to Aditya’s inbox.';
      formState = { name: '', email: '', subject: '', message: '' };
    } else {
      submitStatus = 'error';
      serverMessage = "Your message could not be sent. Please try again later or contact me directly.";
      mailtoFallback = (data && data.mailto_fallback) || 'mailto:fallback@test.com';
      // formData is preserved
    }
  } catch {
    submitStatus = 'error';
    serverMessage = "Your message could not be sent. Please try again later or contact me directly.";
    mailtoFallback = 'mailto:fallback@test.com';
    // formData is preserved
  } finally {
    loading = false;
  }

  return {
    fetchCalled,
    loading,
    submitStatus,
    serverMessage,
    mailtoFallback,
    formState,
    errors: {}
  };
}

test('Contact Form Validation: Empty form submission rejected without API request', async () => {
  const emptyForm = { name: '', email: '', subject: '', message: '' };
  let fetchDispatched = false;

  const result = await simulateContactSubmit({
    formData: emptyForm,
    mockFetch: async () => {
      fetchDispatched = true;
      return { ok: true, json: async () => ({}) };
    }
  });

  assert.equal(result.fetchCalled, false, 'Fetch must not be called when form is empty');
  assert.equal(fetchDispatched, false, 'No API request should be dispatched');
  assert.equal(result.errors.name, 'Please provide your name.');
  assert.equal(result.errors.email, 'Please provide your email address.');
  assert.equal(result.errors.subject, 'Please provide a subject.');
  assert.equal(result.errors.message, 'Please provide a message.');
});

test('Contact Form Validation: Whitespace-only required fields rejected without API request', async () => {
  const whitespaceForm = {
    name: '   ',
    email: '   ',
    subject: '   ',
    message: '          '
  };
  let fetchDispatched = false;

  const result = await simulateContactSubmit({
    formData: whitespaceForm,
    mockFetch: async () => {
      fetchDispatched = true;
      return { ok: true, json: async () => ({}) };
    }
  });

  assert.equal(result.fetchCalled, false, 'Fetch must not be called when fields are whitespace-only');
  assert.equal(fetchDispatched, false);
  assert.equal(result.errors.name, 'Please provide your name.');
  assert.equal(result.errors.email, 'Please provide your email address.');
  assert.equal(result.errors.subject, 'Please provide a subject.');
  assert.equal(result.errors.message, 'Please provide a message.');
});

test('Contact Form Validation: Invalid email formats rejected without API request', async () => {
  const invalidEmails = [
    'not-an-email',
    'user@',
    '@domain.com',
    'user@.com',
    'user@domain..com',
    'user@domain.'
  ];

  for (const badEmail of invalidEmails) {
    let fetchDispatched = false;
    const form = {
      name: 'Jane Recruiter',
      email: badEmail,
      subject: 'Interview Invitation',
      message: 'Hello Aditya, we would love to connect with you regarding opportunities.'
    };

    const result = await simulateContactSubmit({
      formData: form,
      mockFetch: async () => {
        fetchDispatched = true;
        return { ok: true, json: async () => ({}) };
      }
    });

    assert.equal(result.fetchCalled, false, `Fetch should not be called for email: ${badEmail}`);
    assert.equal(fetchDispatched, false);
    assert.ok(result.errors.email, `Expected email validation error for: ${badEmail}`);
  }
});

test('Contact Form Flow: Successful provider response displays success and clears fields', async () => {
  const validForm = {
    name: 'Sarah Recruiter',
    email: 'sarah@venture.com',
    subject: 'Software Opportunity',
    message: 'We are very impressed by your portfolio projects and would love to chat.'
  };

  const result = await simulateContactSubmit({
    formData: validForm,
    mockFetch: async () => ({
      ok: true,
      json: async () => ({
        success: true,
        delivery_status: 'sent',
        message: 'Thank you, Sarah Recruiter. Your message has been sent directly to Aditya’s inbox.',
        message_id: 're_mock_12345'
      })
    })
  });

  assert.equal(result.fetchCalled, true);
  assert.equal(result.submitStatus, 'success');
  assert.equal(result.loading, false, 'Button should be re-enabled');
  assert.equal(result.formState.name, '');
  assert.equal(result.formState.email, '');
  assert.equal(result.formState.subject, '');
  assert.equal(result.formState.message, '');
});

test('Contact Form Flow: Provider delivery error displays failure and preserves entered inputs', async () => {
  const originalForm = {
    name: 'David Client',
    email: 'david@agency.org',
    subject: 'Contract Project',
    message: 'Important details that must not be lost upon network failure.'
  };

  const result = await simulateContactSubmit({
    formData: originalForm,
    mockFetch: async () => ({
      ok: false,
      status: 503,
      json: async () => ({
        success: false,
        delivery_status: 'failed',
        message: 'Your message could not be sent. Please try again later or contact me directly.'
      })
    })
  });

  assert.equal(result.submitStatus, 'error');
  assert.equal(result.serverMessage, 'Your message could not be sent. Please try again later or contact me directly.');
  assert.equal(result.loading, false, 'Submit button must be re-enabled after failure');
  // Crucial requirement: entered inputs must be preserved!
  assert.equal(result.formState.name, originalForm.name);
  assert.equal(result.formState.email, originalForm.email);
  assert.equal(result.formState.subject, originalForm.subject);
  assert.equal(result.formState.message, originalForm.message);
});

test('Contact Form Flow: Provider timeout or network exception displays failure and preserves entered inputs', async () => {
  const originalForm = {
    name: 'Elena Engineer',
    email: 'elena@techcorp.io',
    subject: 'AI Collaboration',
    message: 'Important inquiry message about full stack development.'
  };

  const result = await simulateContactSubmit({
    formData: originalForm,
    mockFetch: async () => {
      throw new Error('Network timeout: Failed to fetch');
    }
  });

  assert.equal(result.submitStatus, 'error');
  assert.equal(result.serverMessage, 'Your message could not be sent. Please try again later or contact me directly.');
  assert.equal(result.loading, false, 'Submit button must be re-enabled after network exception');
  assert.equal(result.formState.name, originalForm.name);
  assert.equal(result.formState.message, originalForm.message);
});

test('Contact Form Flow: Arbitrary 200 without delivery_status="sent" does not show success', async () => {
  const originalForm = {
    name: 'Tester',
    email: 'tester@test.com',
    subject: 'Test Subject',
    message: 'Testing that non-confirmed delivery is never shown as success.'
  };

  const result = await simulateContactSubmit({
    formData: originalForm,
    mockFetch: async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        delivery_status: 'persisted_without_notification', // not "sent"!
        message: 'Saved to local storage.'
      })
    })
  });

  // Must NOT display success!
  assert.notEqual(result.submitStatus, 'success');
  assert.equal(result.submitStatus, 'error');
  assert.equal(result.serverMessage, 'Your message could not be sent. Please try again later or contact me directly.');
  assert.equal(result.formState.name, originalForm.name, 'Form inputs must be preserved');
});
