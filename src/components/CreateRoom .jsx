import { useState } from "react";
import './styles/CreateRoom.css';

const CreateRoom = ({ createRoom, joinRoom }) => {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [action, setAction] = useState("create");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === "create") {
            createRoom(roomName, password);
        } else {
            joinRoom(roomName, password);
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">
                        {action === "create" ? "Створити Кімнату" : "Приєднатися до Кімнати"}
                    </h2>
                    <div className="form-group">
                        <label className="form-label">Назва Кімнати:</label>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        {action === "create" ? "Створити" : "Приєднатися"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;
