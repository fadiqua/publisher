import React from 'react';

export const API_URL = process.env.NODE_ENV === 'production'? `http://5.196.13.70:3091/`: window.location.origin;
export const SOCKET_URL = process.env.NODE_ENV === 'production'? `http://5.196.13.70:3092/`: `http://localhost:3092/`;

export const siderItemsIcons = {
    'home': <svg  width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </svg>,
    'whatshot':<svg  width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M11.71,19C9.93,19 8.5,17.59 8.5,15.86C8.5,14.24 9.53,13.1 11.3,12.74C13.07,12.38 14.9,11.53 15.92,10.16C16.31,11.45 16.5,12.81 16.5,14.2C16.5,16.84 14.36,19 11.71,19M13.5,0.67C13.5,0.67 14.24,3.32 14.24,5.47C14.24,7.53 12.89,9.2 10.83,9.2C8.76,9.2 7.2,7.53 7.2,5.47L7.23,5.1C5.21,7.5 4,10.61 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14C20,8.6 17.41,3.8 13.5,0.67Z" />
    </svg>,
    'group': <svg  width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M11,10V12H10V14H8V12H5.83C5.42,13.17 4.31,14 3,14A3,3 0 0,1 0,11A3,3 0 0,1 3,8C4.31,8 5.42,8.83 5.83,10H11M3,10A1,1 0 0,0 2,11A1,1 0 0,0 3,12A1,1 0 0,0 4,11A1,1 0 0,0 3,10M16,14C18.67,14 24,15.34 24,18V20H8V18C8,15.34 13.33,14 16,14M16,12A4,4 0 0,1 12,8A4,4 0 0,1 16,4A4,4 0 0,1 20,8A4,4 0 0,1 16,12Z" />
    </svg>,
    'public': <svg width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>,
    'politics': <svg  width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z" />
    </svg>,
    'technology':<svg  width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z" />
    </svg>,
    'entrepreneurship': <svg width="20" viewBox="0 0 24 24">
        <path fill="#ffffff" d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z" />
    </svg>,
    'cultural': <svg width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
    </svg>,
    'self': <svg width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>,
    'search': <svg width="20"  viewBox="0 0 28 23">
        <path fill="#ffffff" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>,
    'help': <svg width="20" viewBox="0 0 28 23">
        <path fill="#ffffff" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
    </svg>
}
export const siderItems = [
    { label: "Main", key:"main", items: [
        {
            name: "Home",
            icon: "home",
            url:'/',
            slug: ''
        },
        {
            name: "Popular",
            url: '/popular',
            icon: "whatshot",
            slug: "popular"
        },
        {
            name: "Members Only",
            key: "/members-only",
            icon: "group",
            slug: "members-only"
        },
    ]},
    {label: "Topics", key: "topics", items: [

    ]},
    {label: "Help", key: "help", items: [
        {
            name: "Search",
            url:"/search/?q=",
            key: "/search",
            icon: "search",
            slug: "search"
        },
        {
            name: "FQA",url:"/faq", key: "/faq", icon: "help" ,
            slug: 'faq'
        }]}
];

export const defaultUserImg = "https://d2gcv4sxt84gxu.cloudfront.net/assets/default-user-avatars-original-d5efadcf497ea7b3d86c6f8d148d66633a29ce78fa8391af628adf32d9989354.png";

export const socialId = {
    facebook: '158671718005040',
    google: '642642017750-h8mh5q0ghfctdctri3ckejec0gebcjb1.apps.googleusercontent.com'
};

// export const API_URL = process.env.NODE_ENV === 'development'? 'http://localhost:3091': 'http://localhost:5000';