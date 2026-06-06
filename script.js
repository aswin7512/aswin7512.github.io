const textToType = "OS: Fedora Linux\nShell: fish\nRole: Backend Engineer\nStack: Python, Flask, PostgreSQL, React\n\n> I engineer scalable Python backends, bridging core server infrastructure with advanced AI integrations.\n\nType 'help' to see available commands.";
const typewriterElement = document.getElementById('typewriter');
let index = 0;

const cmdInput = document.getElementById('cmd-input');
const historyDiv = document.getElementById('history');
const scrollContainer = document.getElementById('scroll-container');

// Manifest of files physically located in the /resources folder
const availableFiles = ['about.txt', 'skills.json', 'experience.sh', 'projects.sh', 'connect.sh'];

// ==========================================
// 1. STATE & HISTORY BUFFER
// ==========================================
const commandBuffer = [];
let bufferIndex = 0;

// ==========================================
// 2. INITIALIZATION & ANIMATION
// ==========================================
function typeWriter() {
    if (index === 0) document.getElementById('profile-container').style.display = 'block';
    
    if (index < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(index) === '\n' ? '<br>' : textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 12);
    } else {
        document.getElementById('cmd-line').style.display = 'flex';
        cmdInput.focus();
    }
}

window.onload = () => setTimeout(typeWriter, 400);

// Smart focus listener that respects native text selection
document.getElementById('terminal').addEventListener('click', () => {
    if (!window.getSelection().toString()) {
        cmdInput.focus();
    }
});

const fishPrompt = `<span class="prompt-span"><span class="p-user">aswinrd@fedora</span> <span class="p-path">~</span><span class="p-sym">></span></span>`;

// ==========================================
// 3. COMMAND EXECUTION & KEYBOARD NAVIGATION
// ==========================================
cmdInput.addEventListener('keydown', async function(e) {
    // Arrow Up: Navigate back in history
    if (e.key === 'ArrowUp') {
        e.preventDefault(); // Stops cursor from jumping to the start of the line
        if (bufferIndex > 0) {
            bufferIndex--;
            this.value = commandBuffer[bufferIndex];
        }
    } 
    // Arrow Down: Navigate forward in history
    else if (e.key === 'ArrowDown') {
        e.preventDefault(); // Stops cursor from jumping to the end
        if (bufferIndex < commandBuffer.length - 1) {
            bufferIndex++;
            this.value = commandBuffer[bufferIndex];
        } else if (bufferIndex >= commandBuffer.length - 1) {
            bufferIndex = commandBuffer.length;
            this.value = ''; // Clears input when reaching the bottom
        }
    } 
    // Enter: Execute command
    else if (e.key === 'Enter') {
        const rawCmd = this.value.trim();
        const cmd = rawCmd.toLowerCase();
        this.value = '';
        
        // Log to history buffer (ignoring empty strings and consecutive duplicates)
        if (rawCmd !== '') {
            if (commandBuffer.length === 0 || commandBuffer[commandBuffer.length - 1] !== rawCmd) {
                commandBuffer.push(rawCmd);
            }
        }
        bufferIndex = commandBuffer.length; // Reset pointer to the newest entry
        
        historyDiv.innerHTML += `<div class="line">${fishPrompt}${cmd}</div>`;
        
        if (cmd === '') {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            return;
        } 
        
        if (cmd === 'help') {
            const output = "<span class=\"title\">[ File Operations ]</span>\n  ls         - List available files\n  cat [file] - Read a text file (e.g., cat about.txt)\n  ./[script] - Execute a script (e.g., ./experience.sh)\n\n<span class=\"title\">[ System Commands ]</span>\n  whoami     - Display current user identity\n  clear      - Clear the terminal screen\n  exit       - Terminate session and close tab";
            historyDiv.innerHTML += `<div class="output">${output}</div>`;
        } else if (cmd === 'ls') {
            const output = '<span class="tech">about.txt  skills.json</span>  <span class="title">experience.sh  projects.sh  connect.sh</span>';
            historyDiv.innerHTML += `<div class="output">${output}</div>`;
        } else if (cmd === 'clear') {
            historyDiv.innerHTML = '';
            typewriterElement.innerHTML = '';
        } else if (cmd === 'exit') {
            historyDiv.innerHTML += `<div class="output">logging out...<br>Connection to fedora closed.</div>`;
            document.getElementById('cmd-line').style.display = 'none';
            setTimeout(() => {
                window.close();
                document.body.innerHTML = '<div style="color: #e2e8f0; font-family: \'Courier New\', Courier, monospace; padding: 1rem; font-size: 1.05rem;">[Process completed]</div>';
                document.body.style.backgroundColor = '#090e17';
            }, 800);
            return;
        } else if (cmd === 'whoami') {
            historyDiv.innerHTML += `<div class="output">aswinrd - Backend Engineer</div>`;
        } else if (cmd.startsWith('cat ') || cmd.startsWith('./')) {
            const file = cmd.replace('cat ', '').replace('./', '');
            
            if (availableFiles.includes(file)) {
                try {
                    const response = await fetch(`resources/${file}`);
                    if (!response.ok) throw new Error('Network error');
                    const fileText = await response.text();
                    historyDiv.innerHTML += `<div class="output">${fileText}</div>`;
                } catch (error) {
                    historyDiv.innerHTML += `<div class="output">Error reading ${file}: Content unavailable</div>`;
                }
            } else {
                historyDiv.innerHTML += `<div class="output">cat: ${file}: No such file or directory</div>`;
            }
        } else {
            historyDiv.innerHTML += `<div class="output">fish: Unknown command: ${cmd}</div>`;
        }
        
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
});