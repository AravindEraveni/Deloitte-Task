import * as React from "react";
import styles from "./TaskByDeloitte.module.scss";
import type { ITaskByDeloitteProps } from "./ITaskByDeloitteProps";

import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";

interface IOption {
  id: number;
  img: string;
  caption?: string; 
}

interface ITaskState {
  selectedId: number | undefined;
  submitted: boolean;
}

const OPTIONS: IOption[] = [
  { id: 1, img: img1 },
  { id: 2, img: img2, caption: "Complex eLearning" },
  { id: 3, img: img3, caption: "eLearning" },
  { id: 4, img: img4, caption: "Medium Complexity eLearning" },
];

export default class TaskByDeloitte extends React.Component<
  ITaskByDeloitteProps,
  ITaskState
> {
  public state: ITaskState = { selectedId: undefined, submitted: false };
  private handleSelect = (id: number): void => {
    this.setState((prev) => ({
      selectedId: prev.selectedId === id ? undefined : id,
      submitted: false,
    }));
  };

  private handleSubmit = (): void => {
    if (this.state.selectedId !== undefined) {
      this.setState({ submitted: true });
    }
  };

  public render(): React.ReactElement<ITaskByDeloitteProps> {
    const { selectedId, submitted } = this.state;

    return (
      <div className={styles.question}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span>Question</span>
            <span className={styles.counter}>01/02</span>
          </div>
          <div className={styles.text}>
            <p>
              Below are three options on how to respond to the scenario above.
              Image question the client side pings you and tells that they have
              a personal emergency and will need to be away from work.
            </p>
            <p>You will ...</p>
          </div>
        </div>

        <p className={styles.instruction}>
          Below are three options on how to respond to the scenario above.
          Please choose the response that resonates most with you and click{" "}
          <strong>Next</strong> to proceed.
        </p>

        <div className={styles.options} role="group" aria-label="Response options">
          {OPTIONS.map((opt) => (
            <label key={opt.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={opt.img} alt="" />
                {opt.caption && (
                  <span className={styles.caption}>{opt.caption}</span>
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedId === opt.id}
                onChange={() => this.handleSelect(opt.id)}
                aria-label={opt.caption || `Option ${opt.id}`}
              />
            </label>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.submit}
            disabled={selectedId === undefined}
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>

        <p className={styles.status} role="status" aria-live="polite">
          {submitted ? "Your response has been submitted." : ""}
        </p>
      </div>
    );
  }
}