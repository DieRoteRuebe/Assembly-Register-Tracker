# 🛠️ Assembly Register Visualizer (WIP)

This tool is designed to make programming in **Assembly** easier and more visual.  
Built with **React**, it follows the **Intel register naming convention** to provide an intuitive way to visualize registers and their current state (e.g. `used`, `free`).

I use this tool to **track variables and register usage** in my own coding projects, especially for low-level development in Assembly.

---

## 🔍 Features

- ✅ **Visual Register State**
  - Shows registers as either `used` or `free`
  - Helps manage register allocation during development

- 🔁 **Stack Operations**
  - `push` a register to the stack  
  - `pop` a register back into use

- 🧮 **Bitwise & Arithmetic Operations**
  - Perform operations like:
    - Bitwise: `AND (&)`, `OR (|)`, `XOR (^)`
    - Arithmetic: `+`, `-`, `*`, `/`

---

## 🚧 Work in Progress

This tool is still under active development. Planned features include:

- ⌨️ Scripting support
- 📈 Enhanced visual UI
- 🛠️ More instruction types (e.g. shifts, jumps)
- 💾 Project save/load functionality

---

## 📌 Goal

To create an intuitive interface that helps **Assembly developers** visualize and manage low-level operations more easily, and ultimately reduce mental overhead when working with register-heavy code.

Stay tuned — more tooling is on the way!


## License Generator Script

This project includes a script to generate a third-party license file. To generate the `THIRDPARTYLICENSES.md` file, you can run the following command:

```bash
node generate-licenses.js
