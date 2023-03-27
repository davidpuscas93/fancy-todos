import { Transition, Dialog } from '@headlessui/react';

import { CloseIcon } from '@/components/icons';

import CreateOrUpdateToDo from '@/components/modules/home/create-or-update-todo/create-or-update-todo.component';

import styles from './side-panel.module.css';

type SidePanelProps = {
  isPanelVisible: boolean;
  onClose: () => void;
  type: 'create' | 'update';
  item?: any;
};

const SidePanel = (props: SidePanelProps) => {
  const { isPanelVisible, onClose, item, type } = props;

  const renderTitle = () => {
    if (type === 'update') {
      return item ? item.title : 'Update ToDO';
    } else {
      return 'Create new ToDO';
    }
  };

  return (
    <Transition
      appear
      show={isPanelVisible}
      as={'div'}
      data-testid='side-panel'
    >
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-hidden'
        onClose={onClose}
      >
        <div
          className={`${styles.sidePanel__gradient} absolute inset-0 overflow-hidden`}
        >
          <Dialog.Overlay className='absolute inset-0' />
          <div className='fixed inset-y-0 right-0 flex w-full max-w-full sm:ml-16 md:w-1/2'>
            <Transition.Child
              as={'div'}
              className={styles.sidePanel}
              enter='transform transition ease-in-out duration-200 sm:duration-300'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-200 sm:duration-300'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <h1 className={styles.sidePanel__header}>
                <span>{renderTitle()}</span>
                <button onClick={onClose} className={styles.sidePanel__close}>
                  <CloseIcon />
                </button>
              </h1>
              <div className={styles.sidePanel__content}>
                {type === 'update' ? (
                  <CreateOrUpdateToDo
                    item={item}
                    type='update'
                    onClose={onClose}
                  />
                ) : (
                  <CreateOrUpdateToDo type='create' onClose={onClose} />
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SidePanel;
