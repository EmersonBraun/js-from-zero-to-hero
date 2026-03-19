import React, {useRef, useState} from 'react';

import styles from './styles.module.css';

interface CodeRunnerProps {
  code: string;
  testCases: Array<{
    input: string;
    expected: string;
    description?: string;
  }>;
  title: string;
}

export default function CodeRunner({code, testCases, title}: CodeRunnerProps) {
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...\n');

    // NOTE: setTimeout does NOT interrupt a synchronous infinite loop in the
    // same JS thread — new Function() runs synchronously and will still freeze
    // the tab if the student writes e.g. `while(true){}`. The timer below only
    // provides user feedback for cases where the code finishes after a delay
    // (e.g., very slow recursive algorithms). A true fix requires a Web Worker.
    // For exercises that accept unbounded input (e.g. roman numerals), validate
    // input length inside the exercise MDX instead.
    const timeoutMs = 5000;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      setOutput('\u23f1\ufe0f Execution timed out (5s limit). Check for infinite loops.');
      setIsRunning(false);
    }, timeoutMs);

    // Create a safe execution environment.
    // NOTE: new Function() is intentionally used here as the core of the
    // CodeRunner component — it executes learner-authored JS code in the
    // browser for educational purposes (same pattern as the leetcode repo).
    try {
      const safeEval = new Function(`
        "use strict";
        let output = '';
        const console = {
          log: (...args) => {
            output += args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\\n';
          }
        };

        ${currentCode}

        // Test with test cases
        output += '\\nTest Results:\\n';
        output += '='.repeat(40) + '\\n';

        ${testCases.map((testCase, i) => {
          const expectedEscaped = JSON.stringify(testCase.expected);
          const inputForEval = testCase.input.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
          return `
        try {
          // Test case ${i + 1}
          const result = eval(\`${inputForEval}\`);
          const expectedStr = ${expectedEscaped};
          let expectedParsed;
          try { expectedParsed = JSON.parse(expectedStr); } catch (e) { expectedParsed = expectedStr; }
          const passed = JSON.stringify(result) === JSON.stringify(expectedParsed);
          output += \`Test ${i + 1}: \${passed ? '✅ PASSED' : '❌ FAILED'}\\n\`;
          output += \`Input: ${testCase.input.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\\n\`;
          output += \`Expected: ${testCase.expected.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\\n\`;
          output += \`Output: \${typeof result === 'object' ? JSON.stringify(result) : result}\\n\`;
          output += '-'.repeat(30) + '\\n';
        } catch (error) {
          output += \`Test ${i + 1}: ❌ ERROR\\n\`;
          output += \`Error: \${error}\\n\`;
          output += '-'.repeat(30) + '\\n';
        }
        `;
        }).join('')}

        return output;
      `);

      const result = safeEval();
      if (!timedOut) {
        clearTimeout(timer);
        setOutput(result);
      }
    } catch (error) {
      if (!timedOut) {
        clearTimeout(timer);
        setOutput(`JavaScript Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    } finally {
      if (!timedOut) {
        setIsRunning(false);
      }
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
  };

  const resetCode = () => {
    setCurrentCode(code);
  };

  return (
    <div className={styles.codeRunner}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <div className={styles.actions}>
          <button
            onClick={copyCode}
            className={styles.actionButton}
            title="Copy code"
          >
            📋
          </button>
          <button
            onClick={resetCode}
            className={styles.actionButton}
            title="Reset code"
          >
            🔄
          </button>
          <button
            onClick={clearOutput}
            className={styles.actionButton}
            title="Clear output"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className={styles.codeContainer}>
        <textarea
          className={styles.codeEditor}
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className={styles.controls}>
        <button
          onClick={runCode}
          disabled={isRunning}
          className={styles.runButton}
        >
          {isRunning ? 'Running...' : '▶️ Run Code'}
        </button>
      </div>

      <div className={styles.outputContainer}>
        <h5>Output:</h5>
        <div ref={outputRef} className={styles.output}>
          {output || 'Click "Run Code" to execute the code and see the results.'}
        </div>
      </div>
    </div>
  );
}
