import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { DebugProtectionFunctionIntervalTemplate } from "../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate";

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../NodeUtils';

export class DebugProtectionFunctionIntervalNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     * @param options
     */
    constructor (debugProtectionFunctionName: string, options: IOptions) {
        super(options);

        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeUtils.appendNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionIntervalTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
