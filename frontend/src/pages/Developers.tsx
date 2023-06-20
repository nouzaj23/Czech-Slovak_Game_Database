import { useEffect, useState } from 'react';
import { DeveloperItem } from '../components/DeveloperItem';
import { Developer } from '../models';
import { DeveloperApi } from '../services';

export const Developers = () => {
    const [filter, setFilter] = useState('');
    const [sortType, setSortType] = useState('name-asc');

    const [developers, setDevelopers] = useState<Developer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDevelopers(await DeveloperApi.retrieveAllDevelopers());
            }
            catch (error) {
                console.log("Games was not loaded");
            }
        }
        fetchData();
    }, []);

    let filteredDevelopers = developers.filter(dev => dev.name.toLowerCase().includes(filter.toLowerCase()));

    filteredDevelopers.sort((a, b) => {
        if (sortType === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortType === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else {
            return 0;
        }
    });

    return (
        <div>
            <div className="p-4 bg-white shadow rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    <input
                        type="text"
                        placeholder="Jméno vývojáře"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded"
                    />

                    <select
                        value={sortType}
                        onChange={e => setSortType(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded"
                    >
                        <option value="name-asc">Abecedně (A-Z)</option>
                        <option value="name-desc">Abecedně (Z-A)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredDevelopers.map(dev => (
                    <DeveloperItem
                        key={dev.id}
                        developer={dev}
                    />
                ))}
            </div>
        </div>
    );
};
