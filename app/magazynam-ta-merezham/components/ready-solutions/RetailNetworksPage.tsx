import Image from "next/image";
import styles from "./retail-networks.module.css";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function RetailNetworksPage() {
  return (
    <main className={styles.retailPage}>
      <section className={styles.retailHero} id="top">
        <div className={styles.retailHeroCopy}>
          <p className={styles.retailKicker}>
            Магазинам та торговельним мережам
          </p>

          <h1>
            Готова категорія
            <br />
            для вашого
            <br />
            <em>будмаркету.</em>
          </h1>

          <p className={styles.retailLead}>
            Запаковані ролети День-Ніч Gekko у стандартних розмірах і
            популярних кольорах. Фірмовий стенд, зрозуміла викладка та
            автоматичне поповнення залишків.
          </p>

          <div className={styles.retailHeroActions}>
            <a
              className={`${styles.retailPill} ${styles.retailLarge}`}
              href="#contact"
            >
              Отримати пропозицію <Arrow />
            </a>

            <a className={styles.retailLink} href="#solution">
              Як це працює ↓
            </a>
          </div>

          <div className={styles.retailProof}>
            <span>
              <b>01</b> Готові до продажу
            </span>

            <span>
              <b>02</b> Стандартні розміри
            </span>

            <span>
              <b>03</b> Популярні кольори
            </span>
          </div>
        </div>

        <div className={styles.retailHeroPhoto}>
          <Image
            src="/assets/images/retail/stand.jpg"
            alt="Фірмовий стенд PiramidSpace із готовими ролетами День-Ніч"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            priority
          />

          <div className={styles.retailPhotoBadge}>
            <b>СТЕНД</b>
            <span>готовий до викладки</span>
          </div>
        </div>
      </section>

      <section className={styles.retailSolution} id="solution">
        <div className={styles.retailSectionHead}>
          <div>
            <p className={styles.retailKicker}>Не просто товар</p>

            <h2>
              Готова система продажу
              <br />
              на одній торговій площі.
            </h2>
          </div>

          <p>
            Ми формуємо асортимент, готуємо продукцію до викладки та
            допомагаємо підтримувати потрібний залишок. Магазину не потрібно
            створювати категорію з нуля.
          </p>
        </div>

        <div className={styles.retailSolutionGrid}>
          <article>
            <span>01</span>
            <h3>Запакований виріб</h3>
            <p>
              Кожна ролета має заводське пакування, розмір, колір і зрозумілу
              комплектацію.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Стандартний асортимент</h3>
            <p>
              Набір популярних розмірів і кольорів без перевантаженого
              каталогу.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Фірмовий стенд</h3>
            <p>
              Компактна викладка з готовим зразком, яку легко розмістити в
              будмаркеті.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Поповнення залишків</h3>
            <p>
              Продані позиції потрапляють у план поповнення, щоб стенд не
              залишався порожнім.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.retailPack} id="stand">
        <div className={styles.retailPackPhoto}>
          <Image
            src="/assets/images/retail/package-close.jpg"
            alt="Заводське пакування ролет День-Ніч Gekko"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        <div className={styles.retailPackCopy}>
          <p className={styles.retailKicker}>Продукт готовий до полиці</p>

          <h2>
            Покупець бачить.
            <br />
            Обирає. Забирає.
          </h2>

          <p>
            На пакуванні — тип виробу, розмір і комплектація. Стандартний ряд
            скорочує консультацію, а готовий виріб можна забрати одразу.
          </p>

          <ul>
            <li>День-Ніч із кріпленням Gekko</li>
            <li>Декілька найпопулярніших кольорів</li>
            <li>Розміри для типових вікон</li>
            <li>Усе необхідне для встановлення всередині</li>
          </ul>
        </div>
      </section>

      <section className={styles.retailRefill} id="refill">
        <div>
          <p className={styles.retailKicker}>Автоматичне поповнення</p>

          <h2>
            Стежимо не лише за продажами.
            <br />
            <em>Стежимо, щоб товар був.</em>
          </h2>
        </div>

        <div className={styles.retailFlow}>
          <article>
            <b>1</b>
            <h3>Продаж</h3>
            <p>Магазин фіксує продану позицію.</p>
          </article>

          <i>→</i>

          <article>
            <b>2</b>
            <h3>Залишок</h3>
            <p>Система визначає потребу в поповненні.</p>
          </article>

          <i>→</i>

          <article>
            <b>3</b>
            <h3>Поставка</h3>
            <p>Формується партія потрібних розмірів і кольорів.</p>
          </article>
        </div>

        <p className={styles.retailNote}>
          Спосіб обміну підлаштовуємо під систему мережі: інтеграція, кабінет
          партнера або регулярний звіт про залишки.
        </p>
      </section>

      <section className={styles.retailCase} id="case">
        <div className={styles.retailCaseCopy}>
          <p className={styles.retailKicker}>Вже працює в роздробі</p>

          <h2>
            Досвід співпраці
            <br />
            з мережею «33 м²»
          </h2>

          <p>
            Готові вироби PiramidSpace вже представлені у будівельній мережі.
            Це не концепція «колись» — ми знаємо, як виглядають серійне
            виробництво, пакування, стенд і постачання партіями.
          </p>

          <div className={styles.retailCaseFacts}>
            <span>
              <b>Готовий товар</b>
              для полиці
            </span>

            <span>
              <b>Партійне виробництво</b>
              під мережу
            </span>

            <span>
              <b>Повторні поставки</b>
              потрібних позицій
            </span>
          </div>
        </div>

        <div className={styles.retailCasePhoto}>
          <Image
            src="/assets/images/retail/batch.jpg"
            alt="Готова партія ролет День-Ніч Gekko"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </section>

      <section className={styles.retailAudience}>
        <p className={styles.retailKicker}>Це рішення для вас, якщо</p>

        <h2>
          У вас будівельний магазин
          <br />
          або мережа будмаркетів.
        </h2>

        <p>
          Почнемо з одного стенда й узгодженого асортименту. Перевіримо
          продажі, швидкість поповнення та реакцію покупців — потім
          масштабуємо.
        </p>

        <a
          className={`${styles.retailPill} ${styles.retailLarge} ${styles.retailLight}`}
          href="#contact"
        >
          Обговорити пілотний стенд <Arrow />
        </a>
      </section>

      <section className={styles.retailContact} id="contact">
        <div>
          <p className={styles.retailKicker}>Пілотний запуск</p>

          <h2>
            Підготуємо стенд
            <br />
            для вашого магазину.
          </h2>

          <p>
            Розкажіть про формат магазину, кількість точок і доступну площу
            для викладки.
          </p>
        </div>

        <a
          className={`${styles.retailPill} ${styles.retailLight}`}
          href="tel:+380959373583"
        >
          095 937 35 83 <Arrow />
        </a>
      </section>
    </main>
  );
}