import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-2xl ">
                <h1>Admin panel...</h1>
                <div className="mt-2">
                    <Link
                        className="text-white bg-purple-400 rounded-md px-4 py-1 "
                        to={'/dashboard'}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </>
    );
}

export default App;
