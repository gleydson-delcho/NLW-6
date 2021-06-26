import { useTheme } from '../../hooks/useTheme';
import './styles.scss';

export function ThemeButton() {

    const { toggleTheme } = useTheme()


    return(
        <div className="themeToggle">
            <input type="checkbox" name="checkbox" id="change-theme" onClick={toggleTheme}/>
            <label htmlFor="change-theme" className="label">                
                <div className="ball"></div>
            </label>
        </div>
    );
}