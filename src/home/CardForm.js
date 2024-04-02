import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({ 
    handleSubmit, 
    handleChange,
    deckId, 
    placeholderFront, 
    placeholderBack, 
    valueFront,
    valueBack,
    secondaryButton,
    primaryButton 
}) 
    {
    const history = useHistory();

        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="front" className="form-label">Front</label>
                        <textarea 
                            className="form-control" 
                            id="front"
                            name="front" 
                            placeholder={placeholderFront}
                            required={true}
                            style={{height: "150px"}}
                            onChange={handleChange}
                            value={valueFront} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="back" className="form-label">Back</label>
                        <textarea 
                            className="form-control" 
                            id="back" 
                            name="back"
                            placeholder={placeholderBack}
                            required={true} 
                            style={{height: "150px"}}
                            onChange={handleChange}
                            value={valueBack}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-lg"
                        style={{marginRight: "10px", marginBottom: "20px"}}
                        onClick={() => history.push(`/decks/${deckId}`)}
                        > {secondaryButton}
                    </button>
                    <button 
                        type="Submit" 
                        className="btn btn-primary btn-lg"
                        style={{marginBottom: "20px"}}
                        > {primaryButton}
                    </button>
                </form>
            </>
        );
    }

export default CardForm;