import React from "react";

const FormComponent = ({ formData, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={formData.front}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={formData.back}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default FormComponent;