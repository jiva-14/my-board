#  Kanban Board

A simple and interactive Kanban Board web application for managing tasks efficiently.

The project allows users to create, edit, delete, and organize tasks across different stages: **To Do, In Progress, and Done**.

## 🚀 Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Add task descriptions
- Set task priority:
  - Low
  - Medium
  - High
- Drag and drop tasks between columns
- Automatic task count updates
- Tasks are saved using browser `localStorage`
- Responsive design for different screen sizes
- Simple and user-friendly interface

## 📌 Task Columns

The board contains three sections:

- **To Do** – Tasks that need to be started
- **In Progress** – Tasks currently being worked on
- **Done** – Completed tasks

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Drag and Drop API
- VS Code
- Git & GitHub

## 📁 Project Structure

```text
kanban-board/
│
├── index.html       # Main webpage structure
├── style.css        # Styling and responsive design
├── app.js           # Main application logic
├── storage.js       # LocalStorage functionality
└── dragDrop.js      # Drag and drop functionality