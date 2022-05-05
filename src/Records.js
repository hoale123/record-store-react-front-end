import { useState, useEffect } from 'react';
import './Records.css';
import RecordCard from './RecordCard.js';
import RecordForm from './RecordForm.js';

function Records() {

    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedRecord, setScopedRecord] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/records")
        .then(res => res.json())
        .then(result => setRecords(result))
        .catch(console.log)
    },[])
    // when showForm is true will be re render when a request it call.

    function addClick() {
        setScopedRecord({id:0, "title":"", "artist":"", "year":""})
        setShowForm(true);
    }

    function notify({ action, record, error }) {
        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }
        switch(action){
            case "add":
                setRecords([...records, record])
                break;
            case "delete":
                //all record but the one clicked is shown
                setRecords(records.filter(r => r.id !== record.id));
                break;
            case "edit":
                //go through records; if id match; return new record.
                // return with new array of element with only the records = to r.id;
                setRecords(records.map(r => {
                    if(r.id !== record.id){
                        return r;
                    }else {
                        return record;
                    }
                }))
            //set the records list again
                break;
            case "edit-form":
                setShowForm(true);
                setScopedRecord(record);
                //break; would go to return setShowForm(false)
                return;
            default:
                console.log("Bad action for notify.")
        }
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <RecordForm record={scopedRecord} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='recordTitle'>Records</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Record</button>
                <table id='records'>
                    <tr>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {records.map(r => <RecordCard key={r.id} record={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Records;