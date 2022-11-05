import css from 'components/App.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <div className={css.form}>
      <label className={css.formLabel}>
        Find contacts by name
        <input
          className={css.formInput}
          name="name"
          value={value}
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};
