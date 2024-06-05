import React from "react";

import styles from "./ErrorBoundary.module.css";
import { classNames } from "../../shared/classNames.mjs";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
  
    componentDidCatch(error, info) {
        console.error(error, info);
    }
  
    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.main}>

                    <div className={styles.textContainer}>
                        <p className={classNames(styles.textSize, styles.text)}>
                            Unexpected error occured <a className={styles.textSize} href="/">Reload page</a>
                        </p>
                    </div>
            
                </div>
            );
        }
  
        return this.props.children;
    }
}