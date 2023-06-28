import { useForm } from 'react-hook-form';
import { DeveloperItem } from '../components/DeveloperItem';
import { Developer } from '../models';
import { DeveloperApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const Developers = () => {
    const { register, watch } = useForm({ defaultValues: { nameFilter: '', sortType: 'name-asc' } });
    const filters = watch();

    const { data: developersData } = useQuery<Developer[]>(['developers'], DeveloperApi.retrieveAllDevelopers);
    const developers = developersData ?? [];

    let filteredDevelopers = developers.filter(dev => dev.name.toLowerCase().includes(filters.nameFilter.toLowerCase()));

    filteredDevelopers.sort((a, b) => {
        if (filters.sortType === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (filters.sortType === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else {
            return 0;
        }
    });

    const [page, setPage] = useState(0);

    const itemsPerPage = 6;
  
    const handleNextPage = () => {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePreviousPage = () => {
      if (page > 0) {
        setPage(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
        <div>
            <div className="p-4 bg-white shadow rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    <input
                        type="text"
                        placeholder="Jméno vývojáře"
                        {...register('nameFilter')}
                        className="p-2 border-2 border-gray-300 rounded"
                    />

                    <select
                        {...register('sortType')}
                        className="p-2 border-2 border-gray-300 rounded"
                    >
                        <option value="name-asc">Abecedně (A-Z)</option>
                        <option value="name-desc">Abecedně (Z-A)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredDevelopers.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(dev => (
                    <DeveloperItem
                        key={dev.id}
                        developer={dev}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-4 pb-4">
                <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 ml-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
                    disabled={page === 0}
                >
                    Předchozí
                </button>
                <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 mr-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredDevelopers.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                    disabled={filteredDevelopers.length <= (page + 1) * itemsPerPage}
                >
                    Další
                </button>
            </div>
        </div>
    );
};
