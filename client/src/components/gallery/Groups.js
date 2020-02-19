import React, { useState, useEffect } from "react";

const Groups = ({ ongroup, photo }) => {
    const [text, setText] = useState("");
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (photo.photos.length > 0) {
            setGroups(photo.photos);
        }
    }, []);

    const onChange = e => {
        setText(e.target.value);
    };

    const onAdd = () => {
        if (text.length < 1) return console.log("too short");
        setGroups([...groups, { _id: "none", name: text }]);
        setText("");
    };

    return (
        <div className="form add-group">
            <div className="form-group add-group-input">
                <input onChange={onChange} type="text" placeholder="New Group Name" value={text} />
                <button onClick={onAdd} className="btn btn-success">
                    Add
                </button>
            </div>
            <div className="form-group">
                <select onChange={ongroup}>
                    {groups.map((item, index) => {
                        return (
                            <option groupid={item._id} key={"select-" + index}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Groups;
