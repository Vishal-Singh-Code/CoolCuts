const Filters = ({ filter, setFilter, resetFilters }) => {
    return (
        <>
            <ul className='text-lg flex flex-wrap space-x-2 md:space-x-5'>
                <li>
                    <div className="mb-4 flex space-x-3">

                        <div className=" relative">
                            <input
                                type="text"
                                placeholder="Search by customer name or date"
                                value={filter.search}
                                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                className="p-2 pl-12 border border-gray-300 rounded-md w-full px-5"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-y-0 left-0 pl-3 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-500"
                                viewBox="0 0 50 50"
                                fill="black"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
                            </svg>
                        </div>

                        <select
                            value={filter.sort}
                            onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Sort by</option>
                            <option value="oldest">Oldest to Newest</option>
                            <option value="newest">Newest to Oldest</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                    </div>
                </li>

                <li>
                    <div className="mb-4 flex items-center space-x-3">

                        <button
                            className={`p-2 border border-gray-300 rounded-md ${filter.status === 'pending' ? 'bg-yellow-300 ' : ''}`}
                            onClick={() => setFilter({ ...filter, status: 'pending' })}
                        >
                            Pending
                        </button>

                        <button
                            className={`p-2 border border-gray-300 rounded-md ${filter.status === 'done' ? 'bg-green-300' : ''}`}
                            onClick={() => setFilter({ ...filter, status: 'done' })}
                        >
                            Done
                        </button>

                        <button
                            className="p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>

                    </div>
                </li>
            </ul>
        </>
    );
};

export default Filters;
