import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

import { FiPlusSquare, FiDelete, FiEdit, FiCheck } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `todos/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) =>
              setTodos((oldArray) => [...oldArray, todo])
            );
          }
        });
      }
      if (!user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    if (todo === "") {
      return;
    }
    const uidd = uid();
    set(ref(db, `todos/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });

    setTodo("");
  };

  // delete
  const handleDelete = (uidd) => {
    remove(ref(db, `todos/${auth.currentUser.uid}/${uidd}`));
  };

  // update
  const handleEdit = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `todos/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      uidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  return (
    <div className="homepage">
      <h2 className="welcome-msg">
        Welcome, {auth.currentUser ? auth.currentUser.email : ""}
      </h2>
      <div className="add-confirm-todo">
        <input
          type="text"
          value={todo}
          className="add-edit-input"
          placeholder="Add new todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        {isEdit ? (
          <span onClick={handleEditConfirm}>
            <FiCheck size={30} className="add-confirm-icon" />
          </span>
        ) : (
          <span onClick={writeToDatabase}>
            <FiPlusSquare size={30} className="add-confirm-icon" />
          </span>
        )}
      </div>

      {auth.currentUser ? (
        <div className="todo-list">
          {todos.length !== 0 ? (
            todos.map((todo, index) => (
              <div className="todo" key={index}>
                <span>{todo.todo}</span>
                <div className="todo-btns">
                  <FiEdit
                    size={30}
                    onClick={() => handleEdit(todo)}
                    className="btn-icon"
                  />
                  <FiDelete
                    size={30}
                    onClick={() => handleDelete(todo.uidd)}
                    className="btn-icon"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No todos to show</p>
          )}
        </div>
      ) : (
        <span className="loader"></span>
      )}

      <GoSignOut size={60} onClick={handleSignOut} className="logout-icon" />
    </div>
  );
};

export default Home;
