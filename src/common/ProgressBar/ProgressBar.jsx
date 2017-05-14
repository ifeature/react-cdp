import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ProgressBar.css';

function computeCompletedCategories(storeCategories, storeTasks) {
    let completedCategories = 0;
    storeCategories.forEach(category => {
        const tasks = category.tasks.map(task => storeTasks.find(t => t._id === task));
        const subCategories = category.categories.map(subCategory => storeCategories.find(c => c._id === subCategory));

        if (tasks.every(task => task.done === true) || tasks.length === 0) {
            completedCategories++;
        }

        if (subCategories.length > 0) {
            completedCategories += computeCompletedCategories(subCategories, storeTasks);
        }
    });

    return completedCategories;
}

function ProgressBar({ categories, tasks, className }) {
    const progressBarClassName = classnames('progress', className);
    const completedCategories = computeCompletedCategories(categories, tasks);
    console.log(completedCategories, categories.length);
    return (
        <div className={progressBarClassName}>
            <progress className="progress__bar" value={completedCategories} max={categories.length}/>
        </div>
    );
}

ProgressBar.propTypes = {
    categories: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    className: PropTypes.string
};

ProgressBar.defaultProps = {
    className: ''
};

export default ProgressBar;
