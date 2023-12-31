import React from 'react'

const Footer = () => {
  const today = new Date();
  return (
    <footer className=" text-slate-900 italic font-extralight text-center items-center">
        <div className="flex justify-center items-center mb-1">
            <span className="text-base mr-1">&lt;&lt;&lt;</span>
            <span className="text-sm">Copyright &copy; {today.getFullYear()} Vicky Estate All rights reserved</span>
            <span className="text-base ml-1">&gt;&gt;&gt;</span>
        </div>
    </footer>
  )
}

export default Footer