import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Mic, Paperclip, StopCircle, X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

// ─── Utility ────────────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Scrollbar styles ────────────────────────────────────────────────────────
const scrollbarStyles = `
  textarea::-webkit-scrollbar { width: 4px; }
  textarea::-webkit-scrollbar-track { background: transparent; }
  textarea::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.1); border-radius: 3px; }
  textarea::-webkit-scrollbar-thumb:hover { background-color: rgba(255,255,255,0.2); }
`;
const useStyleInjection = () => {
  React.useEffect(() => {
    const id = "avicenna-input-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.innerText = scrollbarStyles;
      document.head.appendChild(el);
    }
  }, []);
};

// ─── Textarea ────────────────────────────────────────────────────────────────
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={1}
    className={cn(
      "flex min-h-[36px] w-full resize-none rounded-md border-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// ─── Tooltip ─────────────────────────────────────────────────────────────────
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-xs text-white shadow-md",
        className,
      )}
      {...props}
    />
  ),
);
TooltipContent.displayName = "TooltipContent";

// ─── Dialog ──────────────────────────────────────────────────────────────────
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out md:max-w-[800px]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-all hover:bg-white/20">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = "DialogContent";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold text-white", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// ─── VoiceRecorder ───────────────────────────────────────────────────────────
const VoiceRecorder = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 28,
}) => {
  const timeRef = React.useRef(0);
  const [display, setDisplay] = React.useState("00:00");
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timeRef.current = 0;
      timerRef.current = setInterval(() => {
        timeRef.current += 1;
        const mins = Math.floor(timeRef.current / 60);
        const secs = timeRef.current % 60;
        setDisplay(
          `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
        );
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onStopRecording(timeRef.current);
      timeRef.current = 0;
      setDisplay("00:00");
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, onStartRecording, onStopRecording]);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-3 transition-all duration-300",
        isRecording ? "opacity-100" : "h-0 opacity-0",
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span className="font-mono text-sm text-white/70">{display}</span>
      </div>
      <div className="flex h-8 w-full items-center justify-center gap-0.5 px-4">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 animate-pulse rounded-full bg-white/30"
            style={{
              height: `${Math.max(20, Math.random() * 100)}%`,
              animationDelay: `${i * 0.06}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── ImageViewDialog ──────────────────────────────────────────────────────────
const ImageViewDialog = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
        >
          <img
            src={imageUrl}
            alt="Full preview"
            className="max-h-[80vh] w-full rounded-2xl object-contain"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

// ─── PromptInput Context ──────────────────────────────────────────────────────
const PromptInputContext = React.createContext({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
});
const usePromptInput = () => React.useContext(PromptInputContext);

const PromptInput = React.forwardRef(
  (
    {
      className,
      isLoading = false,
      maxHeight = 240,
      value,
      onValueChange,
      onSubmit,
      children,
      disabled = false,
      onDragOver,
      onDragLeave,
      onDrop,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const handleChange = (v) => {
      setInternalValue(v);
      onValueChange?.(v);
    };
    return (
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            isLoading,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            disabled,
          }}
        >
          <div
            ref={ref}
            className={cn(
              "rounded-2xl border border-white/[0.08] bg-slate-900 p-2 transition-colors duration-200 focus-within:border-white/[0.15]",
              className,
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    );
  },
);
PromptInput.displayName = "PromptInput";

const PromptInputTextarea = ({
  className,
  onKeyDown,
  disableAutosize = false,
  placeholder,
  ...props
}) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className={cn("text-sm", className)}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={1000}
      {...props}
    />
  );
};

const PromptInputActions = ({ children, className, ...props }) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

const PromptInputAction = ({ tooltip, children, side = "top", className, ...props }) => {
  const { disabled } = usePromptInput();
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

// ─── Main: PromptInputBox ─────────────────────────────────────────────────────
export const PromptInputBox = React.forwardRef((props, ref) => {
  const {
    onSend = () => {},
    isLoading = false,
    placeholder,
    className,
  } = props;

  const { t, i18n } = useTranslation();
  useStyleInjection();

  const [input, setInput] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [filePreviews, setFilePreviews] = React.useState({});
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    i18n.language || "en",
  );
  const uploadInputRef = React.useRef(null);
  const promptBoxRef = React.useRef(null);

  const languages = [
    { code: "en", label: "EN" },
    { code: "ko", label: "한국어" },
    { code: "uz", label: "O'zbek" },
  ];

  React.useEffect(() => {
    setSelectedLanguage(i18n.language || "en");
  }, [i18n.language]);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const processFile = React.useCallback((file) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return;
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = (e) =>
      setFilePreviews({ [file.name]: e.target?.result });
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragLeave = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropped = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (dropped.length > 0 && dropped[0]) processFile(dropped[0]);
    },
    [processFile],
  );

  const handleRemoveFile = (index) => {
    const f = files[index];
    if (f && filePreviews[f.name]) setFilePreviews({});
    setFiles([]);
  };

  const handlePaste = React.useCallback(
    (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item && item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            processFile(file);
            break;
          }
        }
      }
    },
    [processFile],
  );

  React.useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      onSend(input.trim(), selectedLanguage, files);
      setInput("");
      setFiles([]);
      setFilePreviews({});
    }
  };

  const handleStartRecording = () => {};
  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const hasContent = input.trim() !== "" || files.length > 0;

  return (
    <>
      <PromptInput
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className={cn(
          "w-full",
          isRecording && "border-red-500/30",
          className,
        )}
        disabled={isLoading || isRecording}
        ref={ref || promptBoxRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Image previews */}
        {files.length > 0 && !isRecording && (
          <div className="flex flex-wrap gap-2 px-1 pb-2">
            {files.map((file, index) => (
              <div key={index} className="group relative">
                {file.type.startsWith("image/") && filePreviews[file.name] && (
                  <div
                    className="h-16 w-16 cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(filePreviews[file.name])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedImage(filePreviews[file.name]);
                    }}
                  >
                    <img
                      src={filePreviews[file.name]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <div
          className={cn(
            "transition-all duration-300",
            isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100",
          )}
        >
          <PromptInputTextarea
            placeholder={placeholder || t("chat.placeholder")}
          />
        </div>

        {/* Voice waveform */}
        {isRecording && (
          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        )}

        {/* Action bar */}
        <PromptInputActions className="justify-between pt-2">
          {/* Left: language pills + attach */}
          <div
            className={cn(
              "flex items-center gap-0.5 transition-opacity duration-300",
              isRecording ? "invisible h-0 opacity-0" : "visible opacity-100",
            )}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                  selectedLanguage === lang.code
                    ? "bg-white/10 text-white/80"
                    : "text-white/25 hover:bg-white/5 hover:text-white/50",
                )}
              >
                {lang.label}
              </button>
            ))}

            <div className="mx-1.5 h-4 w-px bg-white/10" />

            <PromptInputAction tooltip="Attach image">
              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/25 transition-colors hover:bg-white/10 hover:text-white/50"
                disabled={isRecording}
              >
                <Paperclip className="h-3.5 w-3.5" />
                <input
                  ref={uploadInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) processFile(e.target.files[0]);
                    if (e.target) e.target.value = "";
                  }}
                />
              </button>
            </PromptInputAction>
          </div>

          {/* Right: char count + action button */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {input.length > 0 && !isRecording && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-white/20"
                >
                  {input.length}/1000
                </motion.span>
              )}
            </AnimatePresence>

            <PromptInputAction
              tooltip={
                isLoading
                  ? "Analyzing…"
                  : isRecording
                    ? "Stop recording"
                    : hasContent
                      ? "Send"
                      : "Voice input"
              }
            >
              <button
                type="button"
                onClick={() => {
                  if (isLoading) return;
                  if (isRecording) setIsRecording(false);
                  else if (hasContent) handleSubmit();
                  else setIsRecording(true);
                }}
                disabled={isLoading && !isRecording}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                  isLoading
                    ? "cursor-not-allowed bg-white/5 text-white/20"
                    : isRecording
                      ? "bg-transparent text-red-400 hover:bg-red-500/10"
                      : hasContent
                        ? "bg-amber-400 text-slate-900 hover:bg-amber-300 active:scale-95"
                        : "bg-white/5 text-white/25 hover:bg-white/10 hover:text-white/50",
                )}
              >
                {isLoading ? (
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/50" />
                ) : isRecording ? (
                  <StopCircle className="h-4 w-4" />
                ) : hasContent ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
            </PromptInputAction>
          </div>
        </PromptInputActions>
      </PromptInput>

      <ImageViewDialog
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
});
PromptInputBox.displayName = "PromptInputBox";

export default PromptInputBox;
