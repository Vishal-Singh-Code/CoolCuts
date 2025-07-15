const AppointmentChecklist = ({ appointment, toggleChecklistItemStatus }) => {
    if (
        !appointment.checklist ||
        !Array.isArray(appointment.checklist) ||
        appointment.checklist.length === 0
    ) {
        return <p className="text-gray-700 mt-2">No checklist items</p>;
    }

    return (
        <div className="mt-2">
            <p className="font-semibold">Checklist:</p>
            <ul className="list-none grid grid-cols-2 gap mt-2">
                {appointment.checklist.map((item, index) => (
                    <li key={index} className="flex items-center py-1">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleChecklistItemStatus(appointment.id, index)}
                            className="mr-2"
                        />
                        <span
                            className={
                                item.done ? "line-through text-gray-500" : "text-gray-700"
                            }
                        >
                            {item.text.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentChecklist;
