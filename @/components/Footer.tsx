import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="dark:text-white text-black py-4">
            <div className="container mx-auto flex justify-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Made with ❤️ by Shaad & Adarsh
                </p>
            </div>
        </footer>
    )   
};

export default Footer;