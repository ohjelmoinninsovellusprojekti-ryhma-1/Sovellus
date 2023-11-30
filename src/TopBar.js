import React from 'react';

const TopBar = () => {
    return (
         <div id = "topbarBackground">
            <h1> MOVIEHUB </h1>
            <div class = "topbarButtons">
               <button class = "Movies"><h3>Movies</h3></button>
               <button  class = "Series"> <h3>Series</h3></button>
               <button  class = "contactUs"><h3>Contact Us</h3></button>
               <button  class = "account"><h3>Account</h3></button>
              </div> 
              <div class = "bottomline">
              </div>
         </div>
    )
}

export default TopBar;