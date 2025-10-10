import { useState, useEffect} from 'react'

export default function PRFilterInput({label,selectedValue, options, onSelect}) {
    const [search, setSearch] = useState( selectedValue || "")
    const [showOptions, setShowOptions] = useState(false)
    const filteredOptions = options.filter((o) => 
        o.toLowerCase().startsWith(search.toLowerCase())
    )
    useEffect(() => {
        setSearch(selectedValue || "");
        }, [selectedValue]);
    const handleSelect = (val) => {
        setSearch(val)
        onSelect(val)
        setShowOptions(false)
    }
    const getNoFoundText = (label) => {
        switch (label) {
            case "Created By":
            return "No authors found";
            case "Reviewer":
            return "No reviewers found";
            case "Branch":
            return "No branches found";
            default:
            return `No ${label.toLowerCase()} found`;
        }
    };

  return (
    <div className="w-full relative">
        <label className="text-xs text-white">{label}</label>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowOptions(e.target.value.length > 0);
          }}
          placeholder={`TYPE VALID ${label.toUpperCase()} NAME...`}
          className={`mt-2 border px-4 py-3 text-sm w-full bg-transparent
                  ${search.length > 0 ? "border-brand-primary text-white" : "border-brand-primary/20 text-white/50"}
                  focus:border-brand-primary focus:text-white outline-none`}
        />
        {showOptions && (
          <ul className="absolute top-[80px] left-0 w-full bg-background border border-brand/30  max-h-40 overflow-y-auto z-20 p-4 space-y-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="border border-text/30 p-1 text-sm text-text hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary bg-text/20 cursor-pointer"
                >
                  {opt}
                </li>
              ))
            ) : (
              <li className="border border-brand-secondary/30 p-1 text-sm text-brand-secondary  bg-brand-secondary/10">{getNoFoundText(label)}</li>
            )}
          </ul>
        )}
      </div>
  )
}
