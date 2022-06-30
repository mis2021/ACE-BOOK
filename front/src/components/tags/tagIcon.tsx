import React from 'react'

type Props = {
    name: string;
    identifier: string | null | undefined
}

const PostTagIcon = (props: Props) => {
    return (
        <div>
            <div
                className="text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
                // className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
            >
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-bell-off mr-2"
                >
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
                    <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
                    <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg> */}
                {/* {props.identifier} */}

               <span> {props.name}</span> 
            </div>
        </div>
    )
}

export default PostTagIcon