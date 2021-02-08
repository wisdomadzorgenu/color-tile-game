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
         <div data-testid="history-data">
            <span>Your moves:</span>
            <strong>{props.userMoves}</strong>
            <span className="left-space">AI moves:</span>
            <strong>{props.aiMoves}</strong>                      
         </div>
         <div>
            <h4>Your Move History:</h4>
            <em data-testid="user-move-history">
               {props && props.userHistory && props.userHistory.map((color,index)=>{
                  return <span key={index} className="capitalize">{index === 0 ? '':'->'} {color} </span>
               })}
            </em>         
         </div>
         <div>
            <h4>AI Move History:</h4>
            <em data-testid="ai-move-history">
               {props && props.aiHistory && props.aiHistory.map((color,index)=>{
                  return <span key={index} className="capitalize">{index === 0 ? '':'->'} {color} </span>
               })}
            </em>         
         </div>
      </div>      
   )
}

export default DisplayHistory;