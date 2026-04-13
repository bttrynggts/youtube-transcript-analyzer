class TranscriptAnalyzer {
    constructor() {
          this.videoData = null;
          this.analysisData = null;
          this.init();
    }

  init() {
        document.getElementById('closeBtn').addEventListener('click', () => window.close());
        document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadAsText());
        this.extractTranscript();
  }

  async extractTranscript() {
        this.showLoading(true);
        try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab.url.includes('youtube.com/watch')) {
                          throw new Error('This extension only works on YouTube video pages.');
                }
                const results = await chrome.scripting.executeScript({
                          target: { tabId: tab.id },
                          function: this.getTranscriptFromPage
                });
                const transcriptData = results[0].result;
                if (!transcriptData || transcriptData.segments.length === 0) {
                          throw new Error('Could not find transcript. Make sure the video has captions enabled.');
                }
                this.videoData = {
                          title: transcriptData.title,
                          url: tab.url,
                          segments: transcriptData.segments
                };
                this.analyzeTranscript();
        } catch (error) {
                this.showError(error.message);
                console.error('Error:', error);
        }
  }

  getTranscriptFromPage() {
        const titleEl = document.querySelector('h1.title yt-formatted-string, h1 yt-formatted-string');
        const title = titleEl ? titleEl.textContent.trim() : 'Unknown Video';
        const segments = [];
        const transcriptItems = document.querySelectorAll('[data-timestamp-offset]');
        transcriptItems.forEach(item => {
                const timeMs = parseInt(item.getAttribute('data-timestamp-offset'));
                const text = item.textContent.trim();
                if (text) {
                          const minutes = Math.floor(timeMs / 60000);
                          const seconds = Math.floor((timeMs % 60000) / 1000);
                          const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                          segments.push({ time: timestamp, text });
                }
        });
        return { title, segments };
  }

  analyzeTranscript() {
        const fullText = this.videoData.segments.map(s => s.text).join(' ');
        this.analysisData = {
                summary: this.generateSummary(fullText),
                themes: this.extractThemes(fullText),
                timeline: this.generateTimeline(),
                fullTranscript: this.videoData.segments
        };
        this.displayContent();
        this.showLoading(false);
  }

  generateSummary(text) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const keyPoints = text.match(/(?:important|key|main|significant|crucial)[^.!?]*[.!?]/gi) || [];
        const summary = `
              <p><strong>Overview:</strong> ${sentences.slice(0, 3).join(' ').substring(0, 300)}...</p>
                    <p><strong>Key Points:</strong></p>
                          <ul>
                                  <li>${keyPoints.slice(0, 3).join('</li><li>') || 'Watch the video for detailed insights.'}</li>
                                        </ul>
                                              <p><em>Note: For detailed AI-powered analysis, use Claude with the full transcript.</em></p>
                                                  `;
        return summary;
  }

  extractThemes(text) {
        const keywords = this.extractKeywords(text);
        const themeText = `
              <h3>Primary Topics</h3>
                    <p>Based on transcript analysis:</p>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                                  ${keywords.slice(0, 6).map(kw => `<div style="background: #f0f0f0; padding: 8px; border-radius: 4px; font-size: 12px;">• ${kw}</div>`).join('')}
                                        </div>
                                              <p style="margin-top: 12px; font-size: 12px; color: #999;"><em>For detailed thematic analysis, use Claude with the full transcript.</em></p>
                                                  `;
        return themeText;
  }

  extractKeywords(text) {
        const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can']);
        const words = text.toLowerCase().match(/\b[a-z]+(?:'[a-z]+)?\b/g) || [];
        const freq = {};
        words.filter(w => !commonWords.has(w) && w.length > 4)
          .forEach(w => freq[w] = (freq[w] || 0) + 1);
        return Object.entries(freq)
          .sort((a, b) => b[1] - a[1])
          .map(([word]) => this.capitalize(word))
          .filter((v, i, a) => a.indexOf(v) === i);
  }

  generateTimeline() {
        if (this.videoData.segments.length === 0) return '<p>No segments available.</p>';
        const pivotal = this.videoData.segments.filter((_, i) => i % Math.ceil(this.videoData.segments.length / 5) === 0);
        return `
              <h3>Video Timeline</h3>
                    ${pivotal.map((segment, i) => `
                            <div style="margin-bottom: 12px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                                      <span class="timestamp">${segment.time}</span>
                                                <p style="margin-top: 4px; font-size: 12px;">${segment.text.substring(0, 120)}...</p>
                                                        </div>
                                                              `).join('')}
                                                                  `;
  }

  capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

  displayContent() {
        document.getElementById('videoTitle').textContent = this.videoData.title;
        document.getElementById('videoUrl').textContent = this.videoData.url;
        document.getElementById('videoUrl').href = this.videoData.url;
        document.getElementById('summaryContent').innerHTML = this.analysisData.summary;
        document.getElementById('themesContent').innerHTML = this.analysisData.themes;
        document.getElementById('timelineContent').innerHTML = this.analysisData.timeline;
        const transcriptHtml = this.videoData.segments
          .map(s => `<div style="margin: 8px 0;"><span class="timestamp">[${s.time}]</span> ${s.text}</div>`)
          .join('');
        document.getElementById('transcriptContent').innerHTML = transcriptHtml || '<p>No transcript available.</p>';
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
  }

  switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
  }

  copyToClipboard() {
        const text = this.formatForCopy();
        navigator.clipboard.writeText(text).then(() => {
                alert('Transcript copied to clipboard!');
        });
  }

  downloadAsText() {
        const text = this.formatForCopy();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcript_${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
  }

  formatForCopy() {
        const segments = this.videoData.segments
          .map(s => `[${s.time}] ${s.text}`)
          .join('\n');
        return `Title: ${this.videoData.title}\nURL: ${this.videoData.url}\n\n${segments}`;
  }

  showLoading(show) {
        document.getElementById('loading').style.display = show ? 'flex' : 'none';
  }

  showError(message) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = '❌ ' + message;
  }
}

new TranscriptAnalyzer();
