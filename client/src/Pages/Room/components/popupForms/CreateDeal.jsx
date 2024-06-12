import Modal from 'react-bootstrap/Modal';
import React, {  useState } from "react";
import axios from "axios";
import PlusIcon from "../custom_table/img/Plus";

function CreateDeal({table_id}){
    const [market, setMarket] = useState(null);
    const [setup, setSetup] = useState(null);
    const [long_or_short, setLong_or_short] = useState(null);
    const [result, setResult] = useState(null);
    const [session, setSession] = useState(null);
    const [plan_impuls, setPlan_impuls] = useState(null);
    const [profit, setProfit] = useState(null);
    const [short_description, setShort_description] = useState(null);
    const [notes, setNotes] = useState(null);
    const [emotion_before, setEmotion_before] = useState(null);
    const [emotion_during, setEmotion_during] = useState(null);
    const [power_of_emotion, setPower_of_emotion] = useState(null);
    const [mistake, setMistake] = useState(null);
    const [ideas, setIdeas] = useState(null);
    const [right_actions, setRight_actions] = useState(null);
    const [link, setLink] = useState(null);
    const [comments, setComments] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addDeal = async () => {
        try {
          await axios.post(`/deals/${table_id}`, {
            market: market,
            setup: setup,
            long_or_short: long_or_short,
            session: session,
            result: result,
            plan_impuls: plan_impuls,
            profit: profit,
            short_description: short_description,
            notes: notes,
            emotion_before: emotion_before,
            emotion_during: emotion_during,
            power_of_emotion: power_of_emotion,
            mistake: mistake,
            ideas: ideas,
            right_actions: right_actions,
            link: link,
            comments: comments,
        });
        } catch (err) {
        }
    }

    return (
        <>
            <div className='tr add-row' onClick={handleShow}>
                <span className='svg-icon svg-gray' style={{marginRight: 4}}>
                <PlusIcon />
                </span>
                Add new Deal
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setMarket(null);
                            setSetup(null);
                            setLong_or_short(null);
                            setResult(null);
                            setSession(null);
                            setPlan_impuls(null);
                            setProfit(null);
                            setShort_description(null);
                            setNotes(null);
                            setEmotion_before(null);
                            setEmotion_during(null);
                            setPower_of_emotion();
                            setMistake(null);
                            setIdeas(null);
                            setRight_actions(null);
                            setLink(null);
                            setComments(null);
                            
                            addDeal();
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Market
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="market"
                                    type="text"
                                    value={market}
                                    onChange={(e) => {
                                        setMarket(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Setup
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="setup"
                                    type="text"
                                    value={setup}
                                    onChange={(e) => {
                                        setSetup(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Long or short
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="long_or_short"
                                    type="text"
                                    value={long_or_short}
                                    onChange={(e) => {
                                        setLong_or_short(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Result
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="result"
                                    type="text"
                                    value={result}
                                    onChange={(e) => {
                                        setResult(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Session
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="session"
                                    type="text"
                                    value={session}
                                    onChange={(e) => {
                                        setSession(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Plan impuls
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="plan_impuls"
                                    type="text"
                                    value={plan_impuls}
                                    onChange={(e) => {
                                        setPlan_impuls(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Profit
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="profit"
                                    type="text"
                                    value={profit}
                                    onChange={(e) => {
                                        setProfit(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Short description
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="short_description"
                                    type="text"
                                    value={short_description}
                                    onChange={(e) => {
                                        setShort_description(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Notes
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="notes"
                                    type="text"
                                    value={notes}
                                    onChange={(e) => {
                                        setNotes(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Emotion before
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="emotion_before"
                                    type="text"
                                    value={emotion_before}
                                    onChange={(e) => {
                                        setEmotion_before(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Emotion during
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="emotion_during"
                                    type="text"
                                    value={emotion_during}
                                    onChange={(e) => {
                                        setEmotion_during(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Power of emotion
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="power_of_emotion"
                                    type="text"
                                    value={power_of_emotion}
                                    onChange={(e) => {
                                        setPower_of_emotion(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Mistake
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="mistake"
                                    type="text"
                                    value={mistake}
                                    onChange={(e) => {
                                        setMistake(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Ideas
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="ideas"
                                    type="text"
                                    value={ideas}
                                    onChange={(e) => {
                                        setIdeas(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Right_actions
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="right_actions"
                                    type="text"
                                    value={right_actions}
                                    onChange={(e) => {
                                        setRight_actions(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Link
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="link"
                                    type="text"
                                    value={link}
                                    onChange={(e) => {
                                        setLink(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                >
                                    Comments
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="comments"
                                    type="text"
                                    value={comments}
                                    onChange={(e) => {
                                        setComments(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="font-bold py-2 px-4 rounded" style={{ backgroundColor: 'orangered', color: '#424242' }}
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="font-bold py-2 px-4 rounded" style={{ backgroundColor: 'limegreen', color: '#424242' }}
                        onClick={handleClose}
                        form="editmodal"
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default CreateDeal;