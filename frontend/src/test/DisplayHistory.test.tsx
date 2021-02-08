import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayHistory from '../components/DisplayHistory'

describe("Display History test suite",()=>{
   test("Renders component",()=>{
      const props = {userMoves:2,userHistory:['Red','Green'],aiMoves:3,aiHistory:['Green','Red','Red']}

      render(<DisplayHistory {...props}/>)

      //get text in document
      const element = screen.getByText(/your move history:/i)

      expect(element).toBeInTheDocument()
   })

   test("Renders user and AI moves with history correctly",()=>{
      const props = {userMoves:2,userHistory:['Red','Green'],aiMoves:3,aiHistory:['Green','Red','Red']}

      render(<DisplayHistory {...props}/>)

      //get moves element & history
      const element = screen.getByTestId('history-data')
      const userHistory = screen.getByTestId('user-move-history')
      const aiHistory = screen.getByTestId('ai-move-history')

      //element should contain text
      expect(element.textContent).toContain("Your moves:2AI moves:3")
      expect(userHistory.textContent).toContain("Red -> Green ")
      expect(aiHistory.textContent).toContain("Green -> Red -> Red ")
   })
})