import React from 'react';

const SocialSharing = () => {
    const handleShare = () => {
        alert('Shared successfully!');
    };

    return (
        <div>
            <h2 className="text-2xl text-white  font-bold mb-20  text-center ml-12 mt-24">Social Sharing</h2>
            <div className="flex justify-center">


                <button onClick={handleShare} className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-extralight px-4 py-2 ml-12 mt-2">


           Share Achievement
            </button>
            </div>
        </div>
    );
};

export default SocialSharing;
