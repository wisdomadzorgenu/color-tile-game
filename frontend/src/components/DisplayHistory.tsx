import React from 'react';

interface Props {
   userMoves:number,
   userHistory:string[],
   aiMoves:number,
   aiHistory:string[]
}

const DisplayHistory: React.FC<Props> = (props) => {
   return (
      <div className="text-center">
         <div>
            <span>Your moves:</span>
            <strong>{props.userMoves}</strong>
            <span className="left-space">AI moves:</span>
            <strong>{props.aiMoves}</strong>                      
         </div>
         <br/>
         <h4>Your Move History:</h4>
         <em>
            {props && props.userHistory && props.userHistory.map((color,index)=>{
               return <span key={index} className="capitalize">{index === 0 ? '':'->'} {color} </span>
            })}
         </em>
         <br/>
         <h4>AI Move History:</h4>
         <em>
            {props && props.aiHistory && props.aiHistory.map((color,index)=>{
               return <span key={index} className="capitalize">{index === 0 ? '':'->'} {color} </span>
            })}
         </em>
      </div>      
   )
}

export default DisplayHistory;