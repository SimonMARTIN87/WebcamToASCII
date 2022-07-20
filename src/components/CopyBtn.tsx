import { useAppContext } from "../context"


export const CopyBtn = () => {
  const {fps} = useAppContext();

  const copy = async () => {
    // à l'ancienne !
    try {
      const asciiLines = document.querySelectorAll('.ascii p');
      let lines = [];
      asciiLines.forEach(p => lines.push(p.textContent));
      await navigator.clipboard.writeText(lines.join('\n'));
      alert('Copié dans le presse-papier.');
      
    } catch (error) {
      console.error(error);
      alert('Impossible de copier dans le presse-papier.');
    }

  }

  const finalBtn = <button className="btn-copy" onClick={copy}>Copy To Clipboard</button>

  return fps == 0 ? finalBtn : null;
}