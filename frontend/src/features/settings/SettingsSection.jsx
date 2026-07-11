import styles from "./SettingsSection.module.css";

function SettingsSection({

                             icon,

                             title,

                             subtitle,

                             children

                         }) {

    return (

        <section className={styles.card}>

            <div className={styles.glow}></div>

            <header className={styles.header}>

                <div className={styles.left}>

                    <div className={styles.icon}>

                        {icon}

                    </div>

                    <div>

                        <h2>

                            {title}

                        </h2>

                        <p>

                            {subtitle}

                        </p>

                    </div>

                </div>

                <div className={styles.badge}>

                    Active

                </div>

            </header>

            <div className={styles.divider}></div>

            <div className={styles.body}>

                {children}

            </div>

        </section>

    );

}

export default SettingsSection;