import stock from '../images/stock.png';
import profile from '../images/gtwebdevlogo.png';
import axios from 'axios';
import {useState, useEffect} from 'react';
function Post() {
    return (
        <div className = "centerDiv">
            <h1>BeMeal</h1>
			<img src={stock} className = "stock" alt="" />
            <div className = "container">
                <div>
                <img src={profile} className = "profile" alt="" />
                </div>
                <div>
                    <h3>My breakfast today was eggs, bacon, and pancakes.</h3>
                </div>
            </div>
        </div>
    )
}
export default Post;