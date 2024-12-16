import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  FaSearch,
  FaComment,
  FaPlus,
  FaThumbtack,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaSave,
  FaFileCsv,
  FaArrowUp,
} from 'react-icons/fa';

function App() {
  const [mode, setMode] = useState('search');
  const [searchText, setSearchText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);
  const [pinnedBots, setPinnedBots] = useState([]);
  const [allBots, setAllBots] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSavedSearchesList, setShowSavedSearchesList] = useState(false);
  const [expandedBots, setExpandedBots] = useState({}); // Object to track expanded bots
  const botsPerPage = 6;
  const chatInputRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const initialBots = getInitialBots();
    setAllBots(initialBots);
    setFilteredBots(initialBots);
    setSavedSearches(getInitialSavedSearches());
    setSearchSuggestions(getInitialSearchSuggestions());
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.style.height = '24px'; // Reset height
      const scrollHeight = searchInputRef.current.scrollHeight;
      const maxHeight = 48; // 2 lines * 24px line height
      searchInputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
    handleSearch();
  }, [searchText]);

  useEffect(() => {
    // Hide chat history when switching to search mode
    if (mode === 'search') {
      setChatHistory([]);
    }
  }, [mode]);

  const getInitialBots = () => {
    return [
        {
          id: 1,
          name: 'Customer Support Bot',
          tags: ['support', 'inquiries', 'helpdesk', 'customers'],
          links: [
            { url: 'https://example.com/support-docs.pdf', version: '1.2', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://example.com/faq.txt', version: '2.0', lastUpdated: '2023-07-25', status: 'pending' },
          ],
          systemPrompt: 'You are a helpful customer support assistant. You have been trained on the following documents: [links]. Please answer questions based on the information in these documents.',
        },
        {
          id: 2,
          name: 'Sales Inquiry Bot',
          tags: ['sales', 'pricing', 'products', 'quotes', 'orders'],
          links: [
            { url: 'https://example.com/product-catalog.pdf', version: '3.1', lastUpdated: '2023-07-15', status: 'success' },
            { url: 'https://example.com/pricing-sheet.xlsx', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a sales assistant providing information about our products and pricing. You are familiar with the following documents: [links]. Please provide accurate quotes and answer sales-related questions.',
        },
        {
          id: 3,
          name: 'HR Policy Bot',
          tags: ['hr', 'policy', 'benefits', 'onboarding', 'employees', 'handbook'],
          links: [
            { url: 'https://example.com/employee-handbook.pdf', version: '4.0', lastUpdated: '2023-07-10', status: 'success' },
            { url: 'https://example.com/benefits-guide.docx', version: '1.5', lastUpdated: '2023-07-22', status: 'failed' },
            { url: 'https://example.com/company-policies.txt', version: '2.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are an HR assistant providing information about company policies, benefits, and onboarding procedures. You have access to the following documents: [links]. Please answer questions based on these resources.',
        },
        {
          id: 4,
          name: 'Technical Support Bot',
          tags: ['technical', 'support', 'troubleshooting', 'issues', 'helpdesk', 'technical documents'],
          links: [
            { url: 'https://example.com/technical-docs.pdf', version: '1.0', lastUpdated: '2023-07-18', status: 'success' },
            { url: 'https://example.com/troubleshooting.txt', version: '1.2', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a technical support assistant. You are knowledgeable about our products and have access to technical documents. Please assist users with troubleshooting and resolving technical issues.',
        },
        {
          id: 5,
          name: 'Marketing Bot',
          tags: ['marketing', 'promotions', 'campaigns', 'social media', 'advertising'],
          links: [
            { url: 'https://example.com/marketing-materials.zip', version: '2.5', lastUpdated: '2023-07-26', status: 'pending' },
            { url: 'https://example.com/social-media-guidelines.pdf', version: '1.1', lastUpdated: '2023-07-21', status: 'success' },
          ],
          systemPrompt: 'You are a marketing assistant. You are familiar with our marketing campaigns, promotions, and social media guidelines. Please provide information about our marketing efforts.',
        },
        {
          id: 6,
          name: 'Financial Bot',
          tags: ['finance', 'accounting', 'budget', 'reports', 'expenses'],
          links: [
            { url: 'https://example.com/financial-reports.pdf', version: '4.2', lastUpdated: '2023-07-29', status: 'success' },
            { url: 'https://example.com/budget-guidelines.docx', version: '1.3', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a financial assistant. You have access to financial reports and budget guidelines. Please assist with questions related to finance and accounting.',
        },
        {
          id: 7,
          name: 'Legal Bot',
          tags: ['legal', 'compliance', 'contracts', 'agreements', 'regulations'],
          links: [
            { url: 'https://example.com/legal-docs.pdf', version: '3.0', lastUpdated: '2023-07-23', status: 'success' },
            { url: 'https://example.com/compliance-regulations.txt', version: '1.9', lastUpdated: '2023-07-28', status: 'failed' },
          ],
          systemPrompt: 'You are a legal assistant. You are knowledgeable about legal documents, compliance, and regulations. Please provide information based on legal resources.',
        },
        {
          id: 8,
          name: 'Operations Bot',
          tags: ['operations', 'logistics', 'supply chain', 'inventory', 'processes'],
          links: [
            { url: 'https://example.com/operations-manual.pdf', version: '2.1', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://example.com/inventory-report.xlsx', version: '1.6', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are an operations assistant. You are familiar with our operations manual and inventory reports. Please assist with questions related to logistics and supply chain processes.',
        },
        {
          id: 9,
          name: 'Product Development Bot',
          tags: ['product', 'development', 'innovation', 'design', 'features', 'roadmap'],
          links: [
            { url: 'https://example.com/product-roadmap.pdf', version: '5.0', lastUpdated: '2023-07-25', status: 'success' },
            { url: 'https://example.com/design-specs.docx', version: '2.4', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a product development assistant. You have access to the product roadmap and design specifications. Please provide information about product features and development plans.',
        },
        {
          id: 10,
          name: 'IT Support Bot',
          tags: ['it', 'support', 'network', 'security', 'systems', 'infrastructure', 'helpdesk'],
          links: [
            { url: 'https://example.com/it-security-policy.pdf', version: '1.7', lastUpdated: '2023-07-22', status: 'success' },
            { url: 'https://example.com/network-diagram.png', version: '1.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are an IT support assistant. You are knowledgeable about IT security policies and network infrastructure. Please assist with questions related to IT systems and security.',
        },
      ];
  };

  const getInitialSavedSearches = () => {
    return [
        { name: 'Support Chat', searchText: 'support OR helpdesk', pinnedBots: [1] },
        { name: 'Sales and Pricing', searchText: 'sales AND pricing', pinnedBots: [2] },
        { name: 'HR Policies', searchText: 'hr OR policy', pinnedBots: [3] },
        { name: 'Technical Issues', searchText: 'technical AND support', pinnedBots: [4] },
        { name: 'Marketing Campaigns', searchText: 'marketing OR social media', pinnedBots: [5] },
        { name: 'Financial Reports', searchText: 'finance AND reports', pinnedBots: [6] },
      ];
  };

  const getInitialSearchSuggestions = () => {
    return [
        'support', 'sales', 'hr', 'pricing', 'helpdesk', 'technical', 'marketing', 'finance', 'legal', 'operations', 'product', 'it', 'customers', 'quotes', 'orders', 'employees', 'handbook', 'technical documents', 'promotions', 'campaigns', 'social media', 'advertising', 'accounting', 'budget', 'reports', 'expenses', 'compliance', 'contracts', 'agreements', 'regulations', 'logistics', 'supply chain', 'inventory', 'processes', 'innovation', 'design', 'features', 'roadmap', 'network', 'security', 'systems', 'infrastructure'
      ];
  };

  const handleSearch = () => {
    const filtered = allBots.filter(bot => {
      const botName = bot.name.toLowerCase();
      const botTags = bot.tags.join(' ').toLowerCase();
      const botLinks = bot.links.map(link => link.url.toLowerCase()).join(' ');
      const botSystemPrompt = bot.systemPrompt.toLowerCase();
  
      // Split the search text into terms and handle AND/OR logic
      const searchTerms = searchText.toLowerCase().split(/\s+(?:and|or)\s+/);
      const andTerms = searchText.toLowerCase().match(/(\w+)\s+and\s+(\w+)/g);
      const orTerms = searchText.toLowerCase().match(/(\w+)\s+or\s+(\w+)/g);
  
      // Check if each term matches the bot's name, tags, links, or system prompt
      const termMatches = searchTerms.map(term => 
        botName.includes(term) || 
        botTags.includes(term) || 
        botLinks.includes(term) || 
        botSystemPrompt.includes(term)
      );
  
      if (andTerms) {
        // Handle AND conditions: All terms connected by AND must be true
        const andMatches = andTerms.map(andTerm => {
          const terms = andTerm.split(/\s+and\s+/);
          return terms.every(term => 
            botName.includes(term) || 
            botTags.includes(term) || 
            botLinks.includes(term) || 
            botSystemPrompt.includes(term)
          );
        });
        return andMatches.every(match => match);
      } else if (orTerms) {
        // Handle OR conditions: At least one term connected by OR must be true
        const orMatches = orTerms.map(orTerm => {
          const terms = orTerm.split(/\s+or\s+/);
          return terms.some(term => 
            botName.includes(term) || 
            botTags.includes(term) || 
            botLinks.includes(term) || 
            botSystemPrompt.includes(term)
          );
        });
        return termMatches.some(match => match) || orMatches.some(match => match);
      } else {
        // Default: If no AND/OR, any term match is sufficient
        return termMatches.some(match => match);
      }
    });
  
    setFilteredBots(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };
  

  const handleChatSubmit = () => {
    if (searchText.trim() === '') return;

    const newMessage = {
      text: searchText,
      sender: 'user',
    };

    setChatHistory([...chatHistory, newMessage]);
    setSearchText('');

    // Simulate chatbot response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        text: `This is a simulated response from ${pinnedBots.length > 0 ? pinnedBots.map(bot => bot.name).join(', ') : 'selected bots'}.`,
        sender: 'bot',
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, botResponse]);
    }, 500);
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setSearchText('');
    setPinnedBots([]);
    setMode('search');
  };

  const togglePin = (botId) => {
    const bot = allBots.find((b) => b.id === botId);
    if (pinnedBots.find((b) => b.id === botId)) {
      setPinnedBots(pinnedBots.filter((b) => b.id !== botId));
    } else {
      setPinnedBots([...pinnedBots, bot]);
    }
  };

  const handleEdit = (botId, field, index = -1) => {
    const updatedBots = [...allBots];
    const botIndex = updatedBots.findIndex((bot) => bot.id === botId);

    if (botIndex === -1) return;

    let newValue = '';
    if (field === 'name') {
      newValue = prompt('Enter new name:', updatedBots[botIndex].name);
    } else if (field === 'tags') {
      newValue = prompt('Enter new tag:', index >= 0 ? updatedBots[botIndex].tags[index] : '');
    } else if (field === 'links') {
      newValue = prompt('Enter new link URL:', index >= 0 ? updatedBots[botIndex].links[index].url : '');
    } else if (field === 'systemPrompt') {
      newValue = prompt('Enter new system prompt:', updatedBots[botIndex].systemPrompt);
    }

    if (newValue === null || newValue.trim() === '') return;

    if (field === 'name') {
      updatedBots[botIndex].name = newValue;
    } else if (field === 'tags' && index >= 0) {
      updatedBots[botIndex].tags[index] = newValue;
    } else if (field === 'links' && index >= 0) {
      updatedBots[botIndex].links[index].url = newValue;
    } else if (field === 'systemPrompt') {
      updatedBots[botIndex].systemPrompt = newValue;
    }

    setAllBots(updatedBots);
  };

  const handleDelete = (botId, field, index = -1) => {
    const updatedBots = allBots.map((bot) => {
      if (bot.id === botId) {
        if (field === 'tags' && index >= 0) {
          return { ...bot, tags: bot.tags.filter((_, i) => i !== index) };
        } else if (field === 'links' && index >= 0) {
          return { ...bot, links: bot.links.filter((_, i) => i !== index) };
        } else if (field === 'bot') {
          if (window.confirm(`Are you sure you want to delete the bot "${bot.name}"?`)) {
            return null; // Will be filtered out below
          } else {
            return bot; // Keep the bot if the user cancels
          }
        }
      }
      return bot;
    }).filter((bot) => bot !== null);
  
    setAllBots(updatedBots);
    if (field === 'bot') {
      setPinnedBots(pinnedBots.filter((bot) => bot.id !== botId));
    }
  };
  
  const getLinkStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="status-icon success" />;
      case 'pending':
        return <FaCheckCircle className="status-icon pending" />;
      case 'failed':
        return <FaTimesCircle className="status-icon failed" />;
      default:
        return null;
    }
  };

  const addTag = (botId) => {
    const newTag = prompt('Enter new tag:');
    if (newTag) {
      setAllBots(
        allBots.map((bot) =>
          bot.id === botId ? { ...bot, tags: [...bot.tags, newTag] } : bot
        )
      );
    }
  };

  const addLink = (botId) => {
    const newLinkUrl = prompt('Enter new link URL:');
    if (newLinkUrl) {
      const newLink = {
        url: newLinkUrl,
        version: '1.0',
        lastUpdated: new Date().toLocaleDateString(),
        status: 'pending',
      };
      setAllBots(
        allBots.map((bot) =>
          bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
        )
      );
    }
  };

  const addBot = () => {
    const newBotName = prompt('Enter new bot name:');
    if (newBotName) {
      const newBot = {
        id: allBots.length + 1,
        name: newBotName,
        tags: [],
        links: [],
        systemPrompt: '',
      };
      setAllBots([...allBots, newBot]);
      // Update filteredBots to include the new bot
      setFilteredBots([...allBots, newBot]);
    }
  };

  const saveCurrentSearch = () => {
    const name = prompt('Enter a name for this search:');
    if (name) {
      setSavedSearches([
        ...savedSearches,
        { name, searchText, pinnedBots: pinnedBots.map((bot) => bot.id) },
      ]);
    }
  };

  const handleLoadSearch = (search) => {
    setSearchText(search.searchText);
    setPinnedBots(allBots.filter((bot) => search.pinnedBots.includes(bot.id)));
    handleSearch();
    setMode('search');
    setShowSavedSearchesList(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let links = [];

      if (file.type === 'text/csv') {
        links = content.split(/\r?\n/).map((line) => line.split(',')[0].trim());
      } else {
        links = content.split(/\r?\n/).map((line) => line.trim());
      }

      links = links.filter((link) => link);

      if (links.length > 0) {
        const botId = parseInt(prompt('Enter the ID of the bot to add links to:'));
        if (botId && allBots.some((bot) => bot.id === botId)) {
          setAllBots(
            allBots.map((bot) => {
              if (bot.id === botId) {
                const newLinks = links.map((url) => ({
                  url,
                  version: '1.0',
                  lastUpdated: new Date().toLocaleDateString(),
                  status: 'pending',
                }));
                return { ...bot, links: [...bot.links, ...newLinks] };
              }
              return bot;
            })
          );
        } else {
          alert('Invalid bot ID.');
        }
      }
    };

    reader.onerror = () => {
      alert('Error reading file.');
    };

    reader.readAsText(file);
  };

  const stats = {
    numBots: pinnedBots.length,
    numFiles: pinnedBots.reduce((sum, bot) => sum + bot.links.length, 0),
    timeSpan: chatHistory.length > 0 ? 'N/A' : 'No chat history',
    totalTags: new Set(allBots.flatMap((bot) => bot.tags)).size,
    currentTags: new Set(pinnedBots.flatMap((bot) => bot.tags)).size,
  };

    const handleSearchTextChange = (e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
    
        // Update search suggestions based on newSearchText
        const newSuggestions = getInitialSearchSuggestions() // Use the initial suggestions as a base
        .filter(item => item.toLowerCase().includes(newSearchText.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions
    
        setSearchSuggestions(newSuggestions);
    };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSavedSearchesList = () => {
    setShowSavedSearchesList(!showSavedSearchesList);
  };

  const toggleExpand = (botId) => {
    setExpandedBots((prevExpandedBots) => ({
      ...prevExpandedBots,
      [botId]: !prevExpandedBots[botId],
    }));
  };

  const indexOfLastBot = currentPage * botsPerPage;
  const indexOfFirstBot = indexOfLastBot - botsPerPage;
  const currentBots = filteredBots.slice(indexOfFirstBot, indexOfLastBot);

  return (
    <div className="veyr-container">
        <div className="header">
            <h1>VeyR</h1>
            <span className="header-subtitle">- The Intralox Chatbot Aggregator</span>
            <div className="mode-toggle">
            <button
                className={mode === 'search' ? 'active' : ''}
                onClick={() => setMode('search')}
            >
                <FaSearch />
            </button>
            <button
                className={mode === 'chat' ? 'active' : ''}
                onClick={() => setMode('chat')}
            >
                <FaComment />
            </button>
            </div>
        </div>

        <div className="search-chat-area">
            <div className="input-mode-container">
                <textarea
                    ref={searchInputRef}
                    className="search-chat-input"
                    placeholder={
                    mode === 'search'
                        ? 'Search for chatbots...'
                        : 'Enter your message...'
                    }
                    value={searchText}
                    onChange={handleSearchTextChange}
                    onKeyDown={(e) => {
                    if (mode === 'chat' && e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevent newline
                        handleChatSubmit();
                    }
                    }}
                />

                {mode === 'search' && (
                    <div className="search-suggestions">
                    {searchSuggestions.map((suggestion, index) => (
                        <div
                        key={index}
                        className="suggestion"
                        onClick={() => handleSuggestionClick(suggestion)}
                        >
                        {suggestion}
                        </div>
                    ))}
                    </div>
                )}

                {mode === 'chat' && (
                    <button className="chat-submit-button" onClick={handleChatSubmit}>
                    <FaArrowUp />
                    </button>
                )}
            </div>
        </div>

      <div className="controls">
        <button onClick={() => setShowHelp(!showHelp)}>
          <FaQuestionCircle /> Help
        </button>
        <button onClick={() => setShowStats(!showStats)}>
          <FaPlus /> Stats
        </button>
        <button onClick={addBot}>
          <FaPlus /> Add Bot
        </button>
        <button onClick={() => setShowPinnedOnly(!showPinnedOnly)}>
          {showPinnedOnly ? <FaSearch /> : <FaThumbtack />}
          {showPinnedOnly ? 'Show All' : 'Show Pinned'}
        </button>
      </div>

      {showHelp && (
        <div className="help-section">
          <h3>Help</h3>
          <p>
            <b>Search Mode:</b> Enter keywords to search for chatbots. Use "AND" and "OR" for
            complex queries.
          </p>
          <p>
            <b>Chat Mode:</b> Select chatbots to chat with. Type your message in the text area
            and click the send button.
          </p>
          <p>
            <b>Pinning:</b> Click the pin icon to pin a chatbot. Pinned chatbots are included in
            the chat.
          </p>
          <p>
            <b>Editing/Deleting:</b> Right-click (or long press) on a chatbot card, tag, or link to edit or delete it.
          </p>
          <p>
            <b>Adding Items:</b> Click the "+" buttons to add new tags, links, or bots.
          </p>
          <p>
            <b>Saving Searches:</b> Click "Save Search" to save your current search and pinned
            bots for later.
          </p>
          <p>
            <b>Uploading Links:</b> Click "
            <FaFileCsv />
            " to upload a CSV file with a list of links to add to a bot's knowledge.
          </p>
          <p>
            <b>Colored Circles with Check Marks:</b>
          </p>
          <ul>
            <li>
              <FaCheckCircle className="status-icon success" /> Green: File has been successfully
              parsed and vectorized.
            </li>
            <li>
              <FaCheckCircle className="status-icon pending" /> Orange: File has been uploaded but
              is still being processed.
            </li>
            <li>
              <FaTimesCircle className="status-icon failed" /> Red: File failed to be parsed or
              vectorized.
            </li>
          </ul>
        </div>
      )}

      {showStats && (
        <div className="stats-section">
          <h3>Stats</h3>
          <p>Number of Bots in Chat: {stats.numBots}</p>
          <p>Number of Files in Knowledge: {stats.numFiles}</p>
          <p>Time Span Chatting: {stats.timeSpan}</p>
          <p>Total Tags: {stats.totalTags}</p>
          <p>Tags in Current Chat: {stats.currentTags}</p>
        </div>
      )}

        <div className="saved-searches-section">
            <button className="saved-searches-link" onClick={toggleSavedSearchesList}>
                Saved Searches
            </button>
            {showSavedSearchesList && (
                <div className="saved-searches-list">
                {savedSearches.map((search, index) => (
                    <div
                    key={index}
                    className="saved-search"
                    onClick={() => handleLoadSearch(search)}
                    >
                    {search.name}
                    </div>
                ))}
                </div>
            )}
        </div>

      <div className="bot-list">
        {currentBots.map((bot) => (
          <div
            key={bot.id}
            className="bot-card"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <div className="bot-header">
              <h3>{bot.name}</h3>
              <div className="bot-actions">
                <button className="pin-button" onClick={() => togglePin(bot.id)}>
                  <FaThumbtack className={pinnedBots.some((b) => b.id === bot.id) ? 'pinned' : ''} />
                </button>
                <button
                  className="edit-button hidden"
                  onClick={() => handleEdit(bot.id, 'name')}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button hidden"
                  onClick={() => handleDelete(bot.id, 'bot')}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="bot-tags-container">
                <div className="bot-tags">
                    <button className="add-tag-button" onClick={() => addTag(bot.id)}>
                        <FaPlus />
                    </button>
                    <h4>Tags: </h4>
                    {bot.tags.map((tag, index) => (
                        <span
                        key={index}
                        className="tag"
                        onContextMenu={(e) => {
                            e.preventDefault();
                            if (window.confirm(`Edit or delete tag "${tag}"?`)) {
                            handleEdit(bot.id, 'tags', index);
                            } else {
                            handleDelete(bot.id, 'tags', index);
                            }
                        }}
                        >
                        {tag}
                        </span>
                    ))}
                </div>
            </div>
            <button className="expand-button" onClick={() => toggleExpand(bot.id)}>
                {expandedBots[bot.id] ? 'Less' : 'More'}
            </button>

            {expandedBots[bot.id] && (
                <div className="bot-expanded-content">
                <div className="bot-links">
                    <button className="add-link-button" onClick={() => addLink(bot.id)}>
                    <FaPlus />
                    </button>
                    <button
                    className="upload-links-button"
                    onClick={() => document.getElementById('file-upload').click()}
                    >
                    <FaFileCsv />
                    </button>
                    <h4>Links:</h4>
                    {bot.links.map((link, index) => (
                    <div
                        key={index}
                        className="link"
                        onContextMenu={(e) => {
                        e.preventDefault();
                        if (window.confirm(`Edit or delete link "${link.url}"?`)) {
                            handleEdit(bot.id, 'links', index);
                        } else {
                            handleDelete(bot.id, 'links', index);
                        }
                        }}
                    >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                        </a>
                        {getLinkStatusIcon(link.status)}
                        <span className="version">v{link.version}</span>
                        <span className="last-updated">({link.lastUpdated})</span>
                    </div>
                    ))}
                </div>
                <div className="bot-system-prompt">
                    <h4>System Prompt:</h4>
                    <textarea
                    value={bot.systemPrompt}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        handleEdit(bot.id, 'systemPrompt');
                    }}
                    onChange={(e) => handleEdit(bot.id, 'systemPrompt')}
                    readOnly
                    />
                </div>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredBots.length > botsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredBots.length / botsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;