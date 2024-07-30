import { createVNode, render } from 'vue';
import Message from './message/message.vue';

const instances: Array<{ vm: any, container: any }> = [];
interface Message {
    message : string;
    duration : number;
    type : string;
}

const MessageConstructor = (options : Message) => {
  const { message, type, duration } = options;
  let box = document.querySelector('#box');
  if(box == null){
    const box= document.createElement('div');
    box.id = 'box';
    document.body.appendChild(box);
  }
  box = document.querySelector('#box')
  const container = document.createElement('div');
  box!.appendChild(container);
  console.log(container)
  const vm = createVNode(Message, {
    message,
    type,
    duration
  });

  render(vm, container);

  instances.push({ vm, container });
  console.log(instances)
  // Ensure vm.component exists before accessing props
  if (vm.component) {
    vm.component.props.visible = true;

    const removeInstance = () => {
      const index = instances.findIndex(i => i.vm === vm);
      if (index === -1) return;

      const { container } = instances[index];
      render(null, container);
      box = document.querySelector('#box')
      box!.removeChild(container);
      instances.splice(index, 1);
    };

    vm.component.props.visible = true;
    if (vm.component.exposed && vm.component.exposed.startTimer) {
      vm.component.exposed.startTimer();
    }

    setTimeout(() => {
      removeInstance();
    }, duration + 1000);
  }
};

const heysita_message = (options : any) => {
    
  if (typeof options === 'string') {
    options = {
      message: options,
    duration :  500,
    type : 'info'
    };
  }else{
    options = {
        message: options.message,
        duration : options.duration || 500,
        type : options.type || 'info'
        
    };
  }
  MessageConstructor(options);
};

export default heysita_message;
