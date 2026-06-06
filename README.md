# Aswin P | Terminal Portfolio Interface



A vanilla JavaScript terminal emulator and portfolio interface, engineered to simulate a Fedora Linux environment utilizing a `fish` shell aesthetic. 



Live Deployment: [aswin7512.github.io](https://aswin7512.github.io)



## System Architecture



This project strictly bypasses heavy frontend frameworks in favor of high-performance vanilla web technologies to simulate a command-line interface. 



* **State Management:** Implements a custom history buffer array to track session inputs, allowing native `ArrowUp` and `ArrowDown` command recall.

* **Asynchronous Routing:** Abandons standard multi-page navigation. Directory traversal and file reading (e.g., `cat about.txt`) are handled via the `fetch()` API, asynchronously pulling static assets from the `/resources` directory without page reloads.

* **Event Handling:** Utilizes smart focus listeners that preserve native browser text-selection APIs while maintaining the illusion of a persistent terminal cursor.

* **Visual Engineering:** Implements strict CSS grid/flexbox alignments and a purely CSS-driven CRT monitor scanline and text-glow overlay.



## Tech Stack



* **Structure:** HTML5

* **Styling:** Vanilla CSS3 (Custom Properties, DOM manipulation, Filter Effects)

* **Logic:** Vanilla ES6 JavaScript (Async/Await, Event Delegation, DOM API)

* **Hosting:** GitHub Pages (User Domain Root)



## Core Commands



The terminal interprets the following commands natively:



| Command | Execution |

| :--- | :--- |

| `help` | Prints the system manual and available operations. |

| `ls` | Lists available executable scripts and readable text files. |

| `cat [file]` | Fetches and prints the string contents of a specified file. |

| `./[script]` | Executes specified shell script outputs. |

| `clear` | Flushes the active DOM output buffer. |

| `whoami` | Prints current user environment identity. |

| `exit` | Terminates the terminal session. |



## Local Deployment



To run this environment locally:



1. Clone the repository:

&#x20;  ```bash

&#x20;  git clone [https://github.com/aswin7512/aswin7512.github.io.git](https://github.com/aswin7512/aswin7512.github.io.git)



```



2. Navigate to the directory:

```bash

cd aswin7512.github.io



```





3. Due to CORS restrictions on local `fetch()` requests, you must serve the directory via a local web server rather than opening the HTML file directly.

```bash

python3 -m http.server 8000



```





4. Access the interface at `http://localhost:8000`.



```

