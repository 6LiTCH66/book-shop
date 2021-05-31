import React, {useMemo} from 'react';
import '../css/Details.css'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function StarIcon(props){
    const {fill = 'none'} = props;
    return(
        <div className="rate">
            <FontAwesomeIcon icon={faStar} color={fill} size="lg"/>
        </div>
    )
}

function RatingIcon(props){
    const{
        index,
        rating,
        hoverRating,
        onMouseEnter,
        onMouseLeave,
        onSaveRating,
    } = props;

    const fill = useMemo(() => {
        if(hoverRating >= index){
            return '#D4AC0D';
        }
        else if(!hoverRating && rating >= index){
            return '#D4AC0D';
        }
        return 'none'
    },[rating, hoverRating, index])
    return (
        <div className="cursor-pointer" onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()} onClick={() => onSaveRating(index)}>
            <StarIcon fill={fill} />
        </div>
    )
}
export default RatingIcon;
