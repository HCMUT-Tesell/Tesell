const InputField = (props) => {
    const isDisabled = (props.state === 'disabled');
    const isRequired = (props.state === 'required');
  return (
    <div className="flex flex-col w-[180px] h-[50px] gap-1.5 md:gap-2 md:w-[240px] md:h-70px]       my-3">
      <span className={`${isDisabled ? `text-[#B3B3B3]` : `text-[#1E1E1E]`} flex font-light md:font-normal text-[#1E1E1E] text-[14px] md:text-[16px] leading-4 md:leading-[22.4px]`}>Label</span>
      <input type="text" required={isRequired} disabled={isDisabled} className="px-2 py-3 md:px-3 md:py-4 w-full h-5 md:h-10 bg-white 
      border-[0.5px] md:border-[1px] border-solid border-[#D9D9D9] rounded-[3px] md:rounded-[8px]
      font-light md:font-normal text-[14px] md:text-[16px] leading-4 md:leading-[16px] self-stretch text-[#1E1E1E] 
      placeholder:text-[#B3B3B3]
      disabled:text-[#B3B3B3]  disabled:bg-[#D9D9D9] disabled:border-[#B2B2B2]
      required:border-[#900B09] required:focus:border-[#900B09] required:focus:ring-[#900B09]
      
      focus:outline-none  focus:ring-1 focus:ring-sky-400 focus:border-sky-400
      " placeholder="Value" />
    </div>
  )
}

export default InputField
