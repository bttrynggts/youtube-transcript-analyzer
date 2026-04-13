# YouTube Transcript Analyzer - Installation Guide

## Quick Start

### Prerequisites
- Google Chrome or Chromium-based browser
- - A YouTube video with captions/subtitles enabled
 
  - ### Installation Steps
 
  - #### Method 1: From GitHub (Recommended)
 
  - 1. **Clone or Download** the repository:
    2.    ```bash
             git clone https://github.com/bttrynggts/youtube-transcript-analyzer.git
             ```
             Or download as ZIP and extract the folder.

      2. **Open Chrome Extensions Page**:
      3.    - Open Chrome
            -    - Go to `chrome://extensions/`
                 -    - Enable **"Developer mode"** (toggle in top-right corner)
                  
                      - 3. **Load the Extension**:
                        4.    - Click **"Load unpacked"**
                              -    - Select the `youtube-transcript-analyzer` folder
                                   -    - The extension will now appear in your Chrome extensions list
                                    
                                        - 4. **Pin the Extension** (Optional):
                                          5.    - Click the Extensions icon (puzzle piece) in Chrome toolbar
                                                -    - Find "YouTube Transcript Analyzer"
                                                     -    - Click the pin icon to keep it visible
                                                      
                                                          - ### Usage
                                                      
                                                          - 1. Go to any **YouTube video page** that has captions enabled
                                                            2. 2. Click the **extension icon** (📺 Transcript Analyzer)
                                                               3. 3. Wait for the transcript to load (it will show a spinner while extracting)
                                                                  4. 4. Explore the tabs:
                                                                     5.    - **Summary**: Overview and key points
                                                                           -    - **Key Themes**: Primary topics identified
                                                                                -    - **Timeline**: Key moments with timestamps
                                                                                     -    - **Transcript**: Full transcript with timestamps
                                                                                          - 5. Use **Copy to Clipboard** or **Download as Text** buttons to save the transcript
                                                                                           
                                                                                            6. ### Features
                                                                                           
                                                                                            7. ✅ **Extract Transcripts** - Automatically pulls captions from YouTube videos
                                                                                            8. ✅ **Timestamps** - Every segment includes the exact timestamp
                                                                                            9. ✅ **Summary** - Auto-generated overview of video content
                                                                                            10. ✅ **Themes** - Identifies key topics and themes
                                                                                            11. ✅ **Timeline** - Shows pivotal moments throughout the video
                                                                                            12. ✅ **Export** - Copy to clipboard or download as text file
                                                                                            13. ✅ **Beautiful UI** - Clean, modern interface
                                                                                           
                                                                                            14. ### File Structure
                                                                                           
                                                                                            15. ```
                                                                                                youtube-transcript-analyzer/
                                                                                                ├── manifest.json       # Extension configuration
                                                                                                ├── popup.html         # Popup interface
                                                                                                ├── popup.css          # Styling
                                                                                                ├── popup.js           # Main functionality
                                                                                                ├── INSTALLATION.md    # This file
                                                                                                └── README.md          # Project overview
                                                                                                ```

                                                                                                ### Troubleshooting

                                                                                                **Problem**: "This extension only works on YouTube video pages"
                                                                                                - **Solution**: Make sure you're on a YouTube video page (youtube.com/watch?v=...)
                                                                                               
                                                                                                - **Problem**: "Could not find transcript"
                                                                                                - - **Solution**: The video must have captions enabled. Check if captions are available on the video player
                                                                                                 
                                                                                                  - **Problem**: Extension doesn't appear in Chrome
                                                                                                  - - **Solution**:
                                                                                                    -   1. Make sure you're in Developer mode (`chrome://extensions/`)
                                                                                                        2.   2. Check that you selected the correct folder (contains manifest.json)
                                                                                                             3.   3. Try refreshing the page after loading
                                                                                                               
                                                                                                                  4. **Problem**: Transcript is empty or incomplete
                                                                                                                  5. - **Solution**: Some videos may have restricted captions. Try a different video with public captions
                                                                                                                    
                                                                                                                     - ### Advanced Usage
                                                                                                                    
                                                                                                                     - #### For AI Analysis
                                                                                                                     - 1. Use the **"Copy to Clipboard"** button
                                                                                                                       2. 2. Paste the transcript into Claude, ChatGPT, or another AI tool
                                                                                                                          3. 3. Ask for detailed analysis, summaries, or thematic breakdowns
                                                                                                                            
                                                                                                                             4. #### For Research
                                                                                                                             5. 1. Download transcripts as text files
                                                                                                                                2. 2. Organize multiple video transcripts for comparison
                                                                                                                                   3. 3. Create a transcript database for your research
                                                                                                                                     
                                                                                                                                      4. ### Browser Compatibility
                                                                                                                                     
                                                                                                                                      5. - ✅ Chrome 90+
                                                                                                                                         - - ✅ Edge 90+
                                                                                                                                           - - ✅ Brave Browser
                                                                                                                                             - - ✅ Any Chromium-based browser with developer mode
                                                                                                                                              
                                                                                                                                               - ### Permissions
                                                                                                                                              
                                                                                                                                               - This extension requires:
                                                                                                                                               - - **activeTab**: To access the current YouTube video page
                                                                                                                                                 - - **scripting**: To extract transcript data from the video player
                                                                                                                                                   - - **tabs**: To get video URL and metadata
                                                                                                                                                    
                                                                                                                                                     - The extension **does NOT**:
                                                                                                                                                     - - Collect or store any data
                                                                                                                                                       - - Send data to external servers
                                                                                                                                                         - - Access your browsing history
                                                                                                                                                           - - Require account creation
                                                                                                                                                            
                                                                                                                                                             - ### Support & Issues
                                                                                                                                                            
                                                                                                                                                             - For bugs, feature requests, or questions:
                                                                                                                                                             - - Visit: https://github.com/bttrynggts/youtube-transcript-analyzer/issues
                                                                                                                                                               - - Check existing issues before creating a new one
                                                                                                                                                                
                                                                                                                                                                 - ### License
                                                                                                                                                                
                                                                                                                                                                 - This project is provided as-is for educational and personal use.
                                                                                                                                                                
                                                                                                                                                                 - ---
                                                                                                                                                                 
                                                                                                                                                                 **Happy transcript analyzing!** 🎬📝
