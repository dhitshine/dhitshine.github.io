/**
 * Chirpy-style code block enhancements
 * Adds language label and copy button to code blocks
 */

document.addEventListener('DOMContentLoaded', function () {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('figure.highlight');

    codeBlocks.forEach(function (block) {
        // Get the language from the class
        const codeElement = block.querySelector('code');
        let language = 'Code';

        if (codeElement && codeElement.getAttribute('data-lang')) {
            language = codeElement.getAttribute('data-lang');
        } else {
            // Try to get from class
            const classes = block.className.split(' ');
            for (const cls of classes) {
                if (cls !== 'highlight' && cls !== 'language-') {
                    const match = cls.match(/language-(\w+)/);
                    if (match) {
                        language = match[1];
                        break;
                    }
                }
            }
        }

        // Capitalize and format language name
        const langMap = {
            'js': 'JavaScript',
            'ts': 'TypeScript',
            'py': 'Python',
            'rb': 'Ruby',
            'cpp': 'C++',
            'c': 'C',
            'cs': 'C#',
            'sh': 'Shell',
            'bash': 'Bash',
            'zsh': 'Zsh',
            'html': 'HTML',
            'css': 'CSS',
            'scss': 'SCSS',
            'json': 'JSON',
            'yaml': 'YAML',
            'yml': 'YAML',
            'md': 'Markdown',
            'sql': 'SQL',
            'java': 'Java',
            'go': 'Go',
            'rs': 'Rust',
            'swift': 'Swift',
            'kt': 'Kotlin',
            'php': 'PHP',
            'lua': 'Lua',
            'r': 'R',
            'plaintext': 'Text',
            'text': 'Text',
            'console': 'Console',
            'terminal': 'Terminal'
        };

        const displayLang = langMap[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1);

        // Create the code header
        const header = document.createElement('div');
        header.className = 'code-header';
        header.innerHTML = `
      <span class="code-lang">
        <i class="fas fa-code"></i>
        ${displayLang}
      </span>
      <button class="copy-btn" aria-label="Copy code" title="Copy">
        <i class="far fa-clipboard"></i>
      </button>
    `;

        // Insert header at the beginning of the figure
        block.insertBefore(header, block.firstChild);

        // Add copy functionality
        const copyBtn = header.querySelector('.copy-btn');
        copyBtn.addEventListener('click', function () {
            // Find the code element, excluding line numbers
            const codeElement = block.querySelector('td.rouge-code pre') ||
                block.querySelector('code');

            const text = codeElement ? codeElement.innerText : '';

            navigator.clipboard.writeText(text).then(function () {
                // Show success state
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.classList.add('copied');

                // Reset after 2 seconds
                setTimeout(function () {
                    copyBtn.innerHTML = '<i class="far fa-clipboard"></i>';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
