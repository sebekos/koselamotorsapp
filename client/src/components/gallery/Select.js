import React from "react";

const Select = ({ groups, ongroup }) => {
    return (
        <div className="form-group">
            <select onChange={ongroup}>
                {groups.map((item, index) => {
                    return (
                        <option groupname={item._id} key={"select-" + index}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Select;
