import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import './List.css';

function List({data, className, handleComplete, handleEdit}) {
    return (
        <div>
            <ul>
                {
                    data.map(task => {
                        const onComplete = handleComplete.bind(null, task);
                        const onEdit = handleEdit.bind(null, task);
                        return (
                            <li className="list__item" key={task._id}>
                                <ListItem
                                    title={task.title}
                                    done={task.done}
                                    onComplete={onComplete}
                                    onEdit={onEdit}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

List.propTypes = {
    data: PropTypes.array.isRequired,
    handleComplete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    className: PropTypes.string
};

List.defaultProps = {
    className: ''
};

export default List;
