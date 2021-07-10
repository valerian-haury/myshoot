import React, {useState} from "react";
import './targetSelector.css';

import A10 from '../../images/A10.svg'
import A5 from '../../images/A5.svg'
import B4 from '../../images/B4.svg'

const targets = [
    {
        id: 0,
        title: "A5",
        image: A5
    },
    {
        id: 1,
        title: "A10",
        image: A10,
    },
    {
        id: 2,
        title: "B4",
        image: B4,
    },
]

export const TargetSelector = ({targetId}) => {
    const [id, setId] = useState(targetId)

    const handleSelectorClick = (e) => {
        const selectedId = e.currentTarget.id
        console.log(selectedId);
        setId(parseInt(selectedId));
    }

    const renderTargetSelector = targets.map(target => (
        <article id={target.id} key={target.id}
                 className={(target.id === id) ? "target-article selected" : "target-article"}
                 onClick={handleSelectorClick}>
            <img
                className={"target-img"}
                src={target.image}
            />
            <span className={"target-title"}>{target.title}</span>
        </article>
    ))

    return (
        <div className="targets-container">
            {renderTargetSelector}
        </div>
    )
}