import React from 'react';
import { render } from '@testing-library/react';

test('List Renders dropdown', () => {
    // Arrange
    const items = {test: {name: "test"}};
    const { getByText } = render(<List ListType="dropdown" OnChange={() => null} Items={Object.entries(items)}/>);
    // Act
    const optionInSelect = getByText('test'); 
    // Assert
    expect(optionInSelect).toBeTruthy();
});
