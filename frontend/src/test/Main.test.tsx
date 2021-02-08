import React from 'react';
import { render, screen,waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import axiosMock from 'axios'
import Main from "../components/Main"

describe("Main component test suite",()=>{
   test("Main component renders correctly",()=>{
      render(<Main />)

      const headerElement = screen.getByText(/tile color game/i)

      expect(headerElement).toBeInTheDocument()
   })

   // test("Total moves increases on click color", async ()=>{
   //    render(<Main />)

   //    axiosMock.post.mockResolvedValueOnce({
   //       solution:{
   //          moves:2,
   //          history:['Red','Blue','Green']
   //       }
   //    })


   //    //get three color boxes
   //    const redColorElement =  await waitForElement(()=>screen.getByTestId("red-color-box"))
   //    const goldColorElement = await waitForElement(()=>screen.getByTestId("gold-color-box"))
   //    const blueColorElement = await waitForElement(()=> screen.getByTestId("blue-color-box"))

   //    //click any color
   //    // userEvent.click(redColorElement)
   //    // expect(screen.getByText(/total moves: 1/i)).toBeInTheDocument()

   //    // //second click
   //    // userEvent.click(goldColorElement)
   //    // expect(screen.getByText(/total moves: 2/i)).toBeInTheDocument()

   //    // //third click
   //    // userEvent.click(blueColorElement)
   //    // expect(screen.getByText(/total moves: 3/i)).toBeInTheDocument()

   //    // //fourth click
   //    // userEvent.click(redColorElement)
   //    // expect(screen.getByText(/total moves: 4/i)).toBeInTheDocument()
   // })
})