import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Safely parses and renders Markdown to native React elements without dangerouslySetInnerHTML.
 * - Built-in XSS protection: All text nodes are handled by React (automatically escaped).
 * - Links are sanitized to only permit safe protocols (http, https, mailto, relative anchors).
 * - Supports Headings (H1-H6), Bold, Italic, Bold+Italic, Inline Code, Fenced Code Blocks,
 *   Blockquotes, Lists (unordered/ordered), Horizontal Rules, and Paragraphs.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let blockKey = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Fenced Code Block (```lang ... ```)
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++; // skip closing ```
      }

      blocks.push(
        <div
          key={`code-block-${blockKey++}`}
          className="relative bg-cosmos-950/95 border border-cosmos-700/80 rounded-xl my-2 overflow-hidden shadow-inner group"
        >
          {language && (
            <div className="flex items-center justify-between px-3 py-1 bg-cosmos-900/80 border-b border-cosmos-800 text-[10px] font-mono text-slate-400">
              <span className="uppercase tracking-wider text-electric-cyan font-semibold">{language}</span>
            </div>
          )}
          <pre className="p-3 overflow-x-auto text-[11px] font-mono text-electric-cyan leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 2. Empty Line
    if (!trimmed) {
      i++;
      continue;
    }

    // 3. Horizontal Rule (---, ***, ___)
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push(<hr key={`hr-${blockKey++}`} className="border-cosmos-700/60 my-2.5" />);
      i++;
      continue;
    }

    // 4. Blockquotes (> quote)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={`quote-${blockKey++}`}
          className="border-l-2 border-electric-cyan/70 bg-cosmos-900/60 pl-3 py-1.5 my-2 rounded-r-lg italic text-slate-300 text-xs sm:text-sm space-y-1"
        >
          {quoteLines.map((qLine, qIdx) => (
            <p key={qIdx}>{parseInline(qLine)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 5. Headings (#, ##, ###, ####, #####, ######)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const parsedInline = parseInline(headingText);

      switch (level) {
        case 1:
          blocks.push(
            <h2 key={`h1-${blockKey++}`} className="text-base sm:text-lg font-bold text-white mt-3 mb-1 font-display tracking-tight">
              {parsedInline}
            </h2>
          );
          break;
        case 2:
          blocks.push(
            <h3 key={`h2-${blockKey++}`} className="text-sm sm:text-base font-bold text-white mt-2.5 mb-1 font-display tracking-tight">
              {parsedInline}
            </h3>
          );
          break;
        case 3:
          blocks.push(
            <h4 key={`h3-${blockKey++}`} className="text-xs sm:text-sm font-semibold text-electric-cyan mt-2 mb-1 flex items-center gap-1.5">
              {parsedInline}
            </h4>
          );
          break;
        case 4:
          blocks.push(
            <h5 key={`h4-${blockKey++}`} className="text-xs sm:text-sm font-semibold text-slate-200 mt-1.5 mb-0.5">
              {parsedInline}
            </h5>
          );
          break;
        case 5:
        case 6:
        default:
          blocks.push(
            <h6 key={`h5-${blockKey++}`} className="text-xs font-semibold text-slate-300 mt-1 mb-0.5 uppercase tracking-wider">
              {parsedInline}
            </h6>
          );
          break;
      }
      i++;
      continue;
    }

    // 6. Unordered List Items (- , * , + )
    if (/^[-*+]\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*+]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${blockKey++}`} className="space-y-1 my-1.5 pl-4 list-disc text-slate-300 marker:text-electric-cyan text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered List Items (1. , 2. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${blockKey++}`} className="space-y-1 my-1.5 pl-4 list-decimal text-slate-300 marker:text-electric-cyan text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Regular Paragraph
    // Group consecutive non-empty lines that don't start with block markers
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^#{1,6}\s+/.test(lines[i].trim()) &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim()) &&
      !/^[-*+]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push(
        <p key={`p-${blockKey++}`} className="leading-relaxed text-slate-200 my-1 text-xs sm:text-sm">
          {paraLines.map((pLine, pIdx) => (
            <React.Fragment key={pIdx}>
              {parseInline(pLine)}
              {pIdx < paraLines.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>
      );
    }
  }

  return <div className={`space-y-1 text-xs sm:text-sm ${className}`}>{blocks}</div>;
};

/**
 * Sanitizes URLs to permit only safe protocols and prevent XSS (javascript:, data:, vbscript:).
 */
function sanitizeUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  try {
    // Relative paths and anchors
    if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
      return trimmed;
    }
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return trimmed;
    }
    return null;
  } catch {
    if (trimmed.startsWith('mailto:')) {
      return trimmed;
    }
    return null;
  }
}

/**
 * Parses inline Markdown formatting:
 * - Links: [label](url)
 * - Inline Code: `code`
 * - Bold + Italic: ***text*** or ___text___
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_ (preserving internal snake_case variables)
 */
function parseInline(text: string): React.ReactNode {
  if (!text) return null;

  // Single outer capture group preserves tokens during split
  const tokenRegex = /(\[[^\]\n]+\]\(.+?\)|(?:\*\*\*|___).+?(?:\*\*\*|___)|(?:\*\*|__).+?(?:\*\*|__)|`[^`\n]+`|\*[^*\n]+?\*|(?<!\w)_[^_\n]+?_(?!\w))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Link: [label](url)
    const linkMatch = part.match(/^\[([^\]\n]+)\]\((.+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const rawUrl = linkMatch[2];
      const safeUrl = sanitizeUrl(rawUrl);

      if (!safeUrl) {
        return <span key={index}>{label}</span>;
      }

      return (
        <a
          key={index}
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric-cyan font-medium underline underline-offset-2 hover:text-white transition-colors"
        >
          {parseInline(label)}
        </a>
      );
    }

    // 2. Inline Code: `code`
    const codeMatch = part.match(/^`([^`\n]+)`$/);
    if (codeMatch) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-cosmos-950 border border-cosmos-700/80 text-electric-cyan font-mono text-[11px]"
        >
          {codeMatch[1]}
        </code>
      );
    }

    // 3. Bold + Italic: ***text*** or ___text___
    const boldItalicMatch = part.match(/^(\*\*\*|___)(.+?)\1$/);
    if (boldItalicMatch) {
      return (
        <strong key={index} className="font-semibold text-white">
          <em className="italic text-slate-200">{parseInline(boldItalicMatch[2])}</em>
        </strong>
      );
    }

    // 4. Bold: **text** or __text__
    const boldMatch = part.match(/^(\*\*|__)(.+?)\1$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-semibold text-white">
          {parseInline(boldMatch[2])}
        </strong>
      );
    }

    // 5. Italic: *text* or _text_
    const italicMatch = part.match(/^(\*|_)(.+?)\1$/);
    if (italicMatch && !part.startsWith('**') && !part.startsWith('__')) {
      return (
        <em key={index} className="italic text-slate-300">
          {parseInline(italicMatch[2])}
        </em>
      );
    }

    // 6. Plain text (React handles HTML escaping)
    return <span key={index}>{part}</span>;
  });
}
