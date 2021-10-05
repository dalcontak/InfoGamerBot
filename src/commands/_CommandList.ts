import { CommandInt } from '../interfaces/CommandInt';
import { addNick } from './addNick';
import { showNicks } from './showNicks';

export const CommandList: CommandInt[] = [
    addNick, showNicks
];